import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

import { CityPrefixArgsDto } from './dtos';
import { GeodbResponse } from './interfaces';
import { TOO_MANY_REQUESTS_ERROR_CODE } from './constants';

@Injectable()
export class GeodbRepository {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) { }

  async getCitiesByPrefix(
    cityPrefixArgs: CityPrefixArgsDto,
  ): Promise<AxiosResponse<GeodbResponse>> {
    try {
      const { prefix, sort, offset, limit } = cityPrefixArgs;

      const geodbApiBaseUrl =
        this.configService.get<string>('GEODB_API_BASE_URL');

      const apiUrl = `${geodbApiBaseUrl}?namePrefix=${prefix}&sort=${sort}&offset=${offset}&limit=${limit}`;

      return this.httpService
        .get(apiUrl, {
          headers: {
            'X-RapidAPI-Key': this.configService.get<string>('GEODB_API_KEY'),
            'X-RapidAPI-Host': this.configService.get<string>('GEODB_API_HOST'),
          },
        })
        .toPromise();
    } catch (error) {
      if (error instanceof AxiosError && error.code === TOO_MANY_REQUESTS_ERROR_CODE) {
        console.log('Too many requests in a small period of time!')
      } else {
        throw error
      }
    }
  }
}
