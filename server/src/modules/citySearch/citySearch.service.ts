import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';

import { TOO_MANY_REQUESTS_ERROR_CODE } from '@shared';
import { CitySearchRepository } from './citySearch.repository';
import { SearchedCity } from './types';
import { CityPrefixArgsDto } from './dtos';

@Injectable()
export class CitySearchService {
  constructor(
    private readonly citySearchRepository: CitySearchRepository,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getCitiesByPrefix(
    cityPrefixArgs: CityPrefixArgsDto,
  ): Promise<SearchedCity[]> {
    try {
      const cachedCities = await this.cacheManager.get<SearchedCity[]>(
        `cities:${cityPrefixArgs.limit}:${cityPrefixArgs.prefix}`,
      );

      if (cachedCities) {
        return cachedCities;
      }

      const cities =
        await this.citySearchRepository.getCitiesByPrefix(cityPrefixArgs);

      const sortedCities = cities.data.data.reverse();
      const topCities = sortedCities.slice(0, cityPrefixArgs.limit);

      const uniqueCityNames = Array.from(
        new Set(topCities.map((city) => city.name)),
      );

      const resultCitiesList = uniqueCityNames.map((cityName) => ({
        name: cityName,
      }));

      await this.cacheManager.set(
        `cities:${cityPrefixArgs.limit}:${cityPrefixArgs.prefix}`,
        resultCitiesList,
        {
          ttl: this.configService.get<number>(
            'REDIS_SEARCH_CITIES_DATA_TTL_SECONDS',
          ),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      );

      return resultCitiesList;
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response.status === TOO_MANY_REQUESTS_ERROR_CODE
      ) {
        console.log('Too many requests in a small period of time!');
      } else {
        throw error;
      }
    }
  }
}
