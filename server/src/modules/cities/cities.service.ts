import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import {
  NO_MATCHING_LOCATION_FOUND_ERROR_CODE,
  WeatherManagementService,
} from '@modules/weather-management';

import { City } from './entities';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City) private readonly citiesRepository: Repository<City>,
    private readonly weatherManagementService: WeatherManagementService,
  ) {}

  async createCity(
    cityName: string,
    forecastDaysAmount: number,
  ): Promise<City> {
    try {
      let city = await this.findByName(cityName);

      const response = await this.weatherManagementService.getCityWeather(
        cityName,
        forecastDaysAmount,
      );

      const forecast =
        this.weatherManagementService.mapResponseToWeatherForecast(
          response,
          cityName,
        );

      await this.weatherManagementService.cacheForecast(forecast);

      if (city) {
        return city;
      }

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
