import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';

import { daysOfWeek, upperCaseEveryFirstLetter } from '@shared';
import { SubscriptionsService } from '@modules/subscriptions';
import { CitiesService } from '@modules/cities';
import { IWeatherApiResponse, IForecastDay } from './interfaces';
import { WeatherDay, WeatherForecast } from './types';
import { WeatherApiRepository } from './weather-forecast.repository';
import { NO_MATCHING_LOCATION_FOUND_ERROR_CODE } from './constants';

@Injectable()
export class WeatherForecastService {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly weatherApiRepository: WeatherApiRepository,
    private readonly configService: ConfigService,
    private readonly citiesService: CitiesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async getUserCitiesWeather(
    userId: string,
    citiesLimit: number,
    forecastDaysAmount: number,
  ): Promise<WeatherForecast[]> {
    let problematicCity: string;
    const userSubscriptions =
      await this.subscriptionsService.getSubscriptionsByUserId(
        userId,
        citiesLimit,
      );

    if (userSubscriptions.length === 0) {
      return [];
    }

    const cachedForecasts: WeatherForecast[] = [];
    const cities: string[] = [];

    const weatherForecastsPromises = userSubscriptions.map(
      async (subscription) => {
        const { name } = subscription.city;

        const cachedForecast = await this.cacheManager.get<WeatherForecast>(
          `weather_forecast:${name}`,
        );
        
        if (cachedForecast) {
          cachedForecasts.push(cachedForecast);
          return null;
        }

        cities.push(name);

        return this.weatherApiRepository
          .getCityWeather(name, forecastDaysAmount)
          .catch((error) => {
            problematicCity = name;
            throw error;
          });
      },
    );

    try {
      const responses = await Promise.all(weatherForecastsPromises);
      const validResponses = responses.filter((res) => res !== null);

      const newForecasts = this.mapResponsesToWeatherForecasts(
        validResponses,
        cities,
      );

      for (const forecast of newForecasts) {
        await this.cacheManager.set(
          `weather_forecast:${forecast.city.toLowerCase()}`,
          forecast,
          {
            ttl: this.configService.get<number>('REDIS_WEATHER_DATA_TTL'),
            // Type bug
            // Stackoverflow answer - https://stackoverflow.com/a/77066815
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        );
      }

      return [...cachedForecasts, ...newForecasts];
    } catch (error) {
      this.citiesService.deleteCity(problematicCity);
      if (
        error.response.data.error.code === NO_MATCHING_LOCATION_FOUND_ERROR_CODE
      ) {
        throw new BadRequestException(
          error.response.data.error.message,
          error.response.status,
        );
      } else {
        throw error;
      }
    }
  }

  private mapResponsesToWeatherForecasts(
    responses: AxiosResponse<IWeatherApiResponse>[],
    cities: string[],
  ): WeatherForecast[] {
    return responses.map((response, index) => {
      const { data } = response;

      return {
        id: uuidv4(),
        city: upperCaseEveryFirstLetter(cities[index]),
        celsius: data.current.temp_c,
        fahrenheit: data.current.temp_f,
        text: data.current.condition.text,
        humidity: data.current.humidity,
        daysForecast: this.mapForecastDays(data.forecast.forecastday),
      };
    });
  }

  private mapForecastDays(forecastDays: IForecastDay[]): WeatherDay[] {
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
        dayOfWeek,
      };
    });
  }
}
