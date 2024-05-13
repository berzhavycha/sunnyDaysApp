import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { Cache } from 'cache-manager';

import { TOO_MANY_REQUESTS_ERROR_CODE, citySearchKey } from '@shared';

import { CitySearchRepository } from './city-search.repository';
import { CityPrefixArgsDto } from './dtos';
import { SearchedCity } from './types';

@Injectable()
export class CitySearchService {
  constructor(
    private readonly citySearchRepository: CitySearchRepository,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async getCitiesByPrefix(
    cityPrefixArgs: CityPrefixArgsDto,
  ): Promise<SearchedCity[]> {
    try {
      const cachedCities = await this.cacheManager.get<SearchedCity[]>(
        citySearchKey(cityPrefixArgs.limit, cityPrefixArgs.prefix),
      );

      if (cachedCities) {
        return cachedCities;
      }

      const cities =
        await this.citySearchRepository.getCitiesByPrefix(cityPrefixArgs);

      const sortedCities = cities.data.data.reverse();
      const topCities = sortedCities.slice(0, cityPrefixArgs.limit);

      const uniqueCities = topCities.filter(
        (city, index, self) =>
          self.findIndex((c) => c.name === city.name) === index,
      );

      await this.cacheManager.set(
        citySearchKey(cityPrefixArgs.limit, cityPrefixArgs.prefix),
        uniqueCities,
        {
          ttl: this.configService.get<number>(
            'REDIS_SEARCH_CITIES_DATA_TTL_SECONDS',
          ),
          // Type bug
          // Stackoverflow answer - https://stackoverflow.com/a/77066815
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      );

      return uniqueCities;
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response.status !== TOO_MANY_REQUESTS_ERROR_CODE
      ) {
        throw error;
      }
    }
  }
}