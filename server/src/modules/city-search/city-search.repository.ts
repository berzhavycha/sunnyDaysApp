import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';

import { HttpStatusCode, urlBuilder } from '@shared';

import { CityPrefixArgsDto } from './dtos';
import { CitySearchResponse } from './interfaces';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CitySearchRepository {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) { }

  async getCitiesByPrefix(
    cityPrefixArgs: CityPrefixArgsDto,
  ): Promise<AxiosResponse<CitySearchResponse>> {
    const { prefix, sort, offset, limit, minPopulation } = cityPrefixArgs;

    const searchCityApiBaseUrl = this.configService.get<string>(
      'SEARCH_CITIES_API_BASE_URL',
    );

    const apiUrl = urlBuilder(searchCityApiBaseUrl, {
      namePrefix: prefix,
      offset,
      sort,
      limit,
      minPopulation
    })

    const response = this.httpService.get(apiUrl, {
      headers: {
        'X-RapidAPI-Key': this.configService.get<string>(
          'SEARCH_CITIES_API_KEY',
        ),
        'X-RapidAPI-Host': this.configService.get<string>(
          'SEARCH_CITIES_API_HOST',
        ),
      },
      validateStatus: function (status) {
        return (
          status >= HttpStatusCode.SUCCESS &&
          status < HttpStatusCode.REDIRECTION
        );
      },
    });

    return firstValueFrom(response);
  }
}
