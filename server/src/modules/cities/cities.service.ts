import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { DeleteResult, Repository } from 'typeorm';

import {
  NO_MATCHING_LOCATION_FOUND_ERROR_CODE,
  WeatherManagementRepository,
  WeatherManagementService,
} from '@modules/weather-management';

import { City } from './entities';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City) private readonly citiesRepository: Repository<City>,
    private readonly weatherApiRepository: WeatherManagementRepository,
    private readonly weatherManagementService: WeatherManagementService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createCity(
    cityName: string,
    forecastDaysAmount: number,
  ): Promise<City> {
    try {
      let city = await this.findByName(cityName);

      if (city) {
        return city;
      }

      const response = await this.weatherApiRepository.getCityWeather(
        cityName,
        forecastDaysAmount,
      );
      const forecast =
        this.weatherManagementService.mapResponseToWeatherForecast(
          response,
          cityName,
        );

      await this.cacheManager.set(
        `weather_forecast:${forecast.city.toLowerCase()}`,
        forecast,
        {
          ttl: this.configService.get<number>('REDIS_WEATHER_DATA_TTL_SECONDS'),
          // Type bug
          // Stackoverflow answer - https://stackoverflow.com/a/77066815
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      );

      city = this.citiesRepository.create({ name: cityName.toLowerCase() });
      return this.citiesRepository.save(city);
    } catch (error) {
      if (
        error.response.data.error &&
        error.response.data.error.code === NO_MATCHING_LOCATION_FOUND_ERROR_CODE
      ) {
        throw new BadRequestException(
          error.response.data.error.message,
          error.response.status,
        );
      } else {
        throw error;
      }
    }
  }

  async findByName(name: string): Promise<City> {
    return this.citiesRepository.findOne({
      where: { name: name.toLowerCase() },
    });
  }

  async findById(id: string): Promise<City> {
    return this.citiesRepository.findOne({ where: { id } });
  }

  async deleteCity(name: string): Promise<DeleteResult> {
    const city = await this.findByName(name);

    if (!city) {
      throw new NotFoundException(`City '${name}' not found!`);
    }

    return this.citiesRepository.delete(city.id);
  }
}
