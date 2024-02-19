import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

import { IWeatherApiResponse } from './interfaces';
import { HttpStatusCode } from './constants';

@Injectable()
export class WeatherApiRepository {
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

    const apiUrl = `${weatherApiBaseUrl}?key=${weatherApiKey + '11'}&q=${cityName}&days=${forecastDays}`;

    return this.httpService
      .get(apiUrl, {
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
