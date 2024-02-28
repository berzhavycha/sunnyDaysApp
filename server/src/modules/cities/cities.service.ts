import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { City } from './entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City) private readonly citiesRepository: Repository<City>,
  ) {}

  async createCity(cityName: string): Promise<City> {
    let city = await this.findByName(cityName);

    if (city) {
      return city;
    }

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
    return this.citiesRepository.delete(city.id);
  }
}
