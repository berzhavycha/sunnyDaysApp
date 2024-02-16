import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';

import { HttpStatusCode } from '@modules/weather-forecast';
import { CityPrefixArgsDto } from './dtos';
import { CitySearchResponse } from './interfaces';

@Injectable()
export class CitySearchRepository {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getCitiesByPrefix(
    cityPrefixArgs: CityPrefixArgsDto,
  ): Promise<AxiosResponse<CitySearchResponse>> {
    const { prefix, sort, offset, limit, minPopulation } = cityPrefixArgs;

    const searchCityApiBaseUrl =
      this.configService.get<string>('SEARCH_CITIES_API_BASE_URL');

    const apiUrl = `${searchCityApiBaseUrl}?namePrefix=${prefix}&sort=${sort}&offset=${offset}&limit=${limit}&minPopulation=${minPopulation}`;

    return this.httpService
      .get(apiUrl, {
        headers: {
          'X-RapidAPI-Key': this.configService.get<string>('SEARCH_CITIES_API_KEY'),
          'X-RapidAPI-Host': this.configService.get<string>('SEARCH_CITIES_API_HOST'),
        },
        validateStatus: function (status) {
          return (
            status >= HttpStatusCode.SUCCESS &&
            status < HttpStatusCode.REDIRECTION
          );
        },
      })
      .toPromise();
  }
}
