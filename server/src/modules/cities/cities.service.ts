import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { WeatherManagementService } from '@modules/weather-management';

import { cityErrorMessages } from './constants';
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
    let city = await this.findByName(cityName);

    if (city) {
      return city;
    }

    this.weatherManagementService.validateCity(cityName, forecastDaysAmount);

    city = this.citiesRepository.create({ name: cityName.toLowerCase() });
    return this.citiesRepository.save(city);
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
      throw new NotFoundException(cityErrorMessages.cityNotFound(name));
    }

    return this.citiesRepository.delete(city.id);
  }
}
