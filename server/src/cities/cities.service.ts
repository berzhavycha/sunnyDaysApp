import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(City) private readonly citiesRepository: Repository<City>,
    ) {
    }

    async findCity(city: string): Promise<City> {
        return this.citiesRepository.findOne({ where: { cityName: city } })
    }

    async createCityEntity(cityName: string): Promise<City> {
        const cityEntity = await this.findCity(cityName)
        if (cityEntity) return cityEntity

        const city = this.citiesRepository.create({ cityName })
        return this.citiesRepository.save(city)
    }
}
