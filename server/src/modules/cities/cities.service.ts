import { Injectable } from '@nestjs/common';
import { City } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(City) private readonly citiesRepository: Repository<City>,
    ) { }

    async createCity(
        cityName: string
    ): Promise<City> {
        const city = this.citiesRepository.create({ name: cityName })
        return this.citiesRepository.save(city)
    }

    async findByName(name: string): Promise<City> {
        return this.citiesRepository.findOne({ where: { name } })
    }

    async findById(id: string): Promise<City> {
        return this.citiesRepository.findOne({ where: { id } })
    }
}
