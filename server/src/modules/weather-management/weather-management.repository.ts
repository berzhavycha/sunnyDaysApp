import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

import { HttpStatusCode, urlBuilder } from '@shared';

import { IWeatherApiResponse } from './interfaces';

@Injectable()
export class WeatherManagementRepository {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getCityWeather(
    cityName: string,
    forecastDays: number,
  ): Promise<AxiosResponse<IWeatherApiResponse>> {
    const weatherApiKey = this.configService.get<string>('WEATHER_API_KEY');
    const weatherApiBaseUrl = this.configService.get<string>(
      'WEATHER_API_BASE_URL',
    );

    const apiUrl = urlBuilder(weatherApiBaseUrl, {
      key: weatherApiKey,
      q: cityName,
      days: forecastDays,
    });

    const response = this.httpService.get(apiUrl, {
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
