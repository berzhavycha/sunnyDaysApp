import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';

import { GeodbRepository } from './geodb.repository';
import { GeodbCity } from './types';
import { CityPrefixArgsDto } from './dtos';
import { TOO_MANY_REQUESTS_ERROR_CODE } from './constants';

@Injectable()
export class GeodbService {
  constructor(
    private readonly geodbRepository: GeodbRepository,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async getCitiesByPrefix(
    cityPrefixArgs: CityPrefixArgsDto,
  ): Promise<GeodbCity[]> {
    try {
      const cachedCities = await this.cacheManager.get<GeodbCity[]>(
        `cities:${cityPrefixArgs.limit}:${cityPrefixArgs.prefix}`,
      );

      if (cachedCities) {
        return cachedCities;
      }

      const cities = await this.geodbRepository.getCitiesByPrefix(cityPrefixArgs);

      const sortedCities = cities.data.data.reverse();
      const topCities = sortedCities.slice(0, cityPrefixArgs.limit);

      const resultCitiesList = topCities.map((city) => ({
        name: city.name,
      }));

      await this.cacheManager.set(
        `cities:${cityPrefixArgs.limit}:${cityPrefixArgs.prefix}`,
        resultCitiesList,
        {
          ttl: this.configService.get<number>(
            'REDIS_GEODB_CITIES_DATA_TTL_SECONDS',
          ),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      );

      return resultCitiesList;
    } catch (error) {
      if (error instanceof AxiosError && error.response.status === TOO_MANY_REQUESTS_ERROR_CODE) {
        console.log('Too many requests in a small period of time!')
      } else {
        throw error
      }
    }
  }
}
