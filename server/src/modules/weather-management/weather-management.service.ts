import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';

import { daysOfWeek, upperCaseEveryFirstLetter, weatherForecastKey } from '@shared';

import { IForecastDay, IWeatherApiResponse } from './interfaces';
import { WeatherDay, WeatherForecast } from './types';
import { WeatherManagementRepository } from './weather-management.repository';

@Injectable()
export class WeatherManagementService {
  constructor(
    private readonly weatherApiRepository: WeatherManagementRepository,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getCityWeather(
    name: string,
    forecastDaysAmount: number,
  ): Promise<AxiosResponse<IWeatherApiResponse>> {
    return this.weatherApiRepository.getCityWeather(name, forecastDaysAmount);
  }

  async cacheForecast(forecast: WeatherForecast): Promise<void> {
    await this.cacheManager.set(
      weatherForecastKey(forecast.city),
      forecast,
      {
        ttl: this.configService.get<number>('REDIS_WEATHER_DATA_TTL_SECONDS'),
        // Type bug
        // Stackoverflow answer - https://stackoverflow.com/a/77066815
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
    );
  }

  mapResponseToWeatherForecast(
    response: AxiosResponse<IWeatherApiResponse>,
    city: string,
  ): WeatherForecast {
    const { data } = response;

    return {
      id: uuidv4(),
      city: upperCaseEveryFirstLetter(city),
      celsius: data.current.temp_c,
      fahrenheit: data.current.temp_f,
      text: data.current.condition.text,
      humidity: data.current.humidity,
      precip: data.current.precip_mm,
      windSpeed: data.current.wind_kph,
      time: data.location.localtime,
      daysForecast: this.mapForecastDays(data.forecast.forecastday),
    };
  }

  mapForecastDays(forecastDays: IForecastDay[]): WeatherDay[] {
    return forecastDays.map((forecast) => {
      const { date, day } = forecast;
      const dateInstance = new Date(date);

      const dayOfWeek = daysOfWeek[dateInstance.getDay()];

      return {
        id: uuidv4(),
        celsius: day.avgtemp_c,
        fahrenheit: day.avgtemp_f,
        text: day.condition.text,
        humidity: day.avghumidity,
        precip: day.totalprecip_mm,
        windSpeed: day.maxwind_kph,
        maxCelsius: day.maxtemp_c,
        minCelsius: day.mintemp_c,
        maxFahrenheit: day.maxtemp_f,
        minFahrenheit: day.mintemp_f,
        dayOfWeek,
      };
    });
  }
}
