import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

import { Order } from '@shared';

import { SubscriptionsService } from '@modules/subscriptions';
import {
  WeatherForecast,
  WeatherManagementRepository,
  WeatherManagementService,
} from '@modules/weather-management';

import { PaginatedWeatherForecast } from './types';

@Injectable()
export class WeatherForecastService {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly weatherApiRepository: WeatherManagementRepository,
    private readonly weatherManagementService: WeatherManagementService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getUserCitiesWeather(options: {
    userId: string;
    offset: number;
    limit: number;
    order: Order;
    forecastDaysAmount: number;
  }): Promise<PaginatedWeatherForecast> {
    const { userId, offset, limit, order, forecastDaysAmount } = options;

    const userSubscriptions =
      await this.subscriptionsService.getPaginatedSubscriptionsByUserId({
        userId,
        skip: offset,
        take: limit,
        order,
      });

    if (userSubscriptions.length === 0) {
      return {
        edges: [],
        paginationInfo: { totalCount: 0 },
      };
    }

    const cachedForecasts: WeatherForecast[] = [];
    const cities: string[] = [];

    const weatherForecastsPromises = [];
    for (const subscription of userSubscriptions) {
      const { name } = subscription.city;

      const cachedForecast = await this.cacheManager.get<WeatherForecast>(
        `weather_forecast:${name}`,
      );
      if (cachedForecast) {
        cachedForecasts.push(cachedForecast);
        continue;
      }

      cities.push(name);

      weatherForecastsPromises.push(
        this.weatherApiRepository.getCityWeather(name, forecastDaysAmount),
      );
    }

    const responses = await Promise.all(weatherForecastsPromises);
    const validResponses = responses.filter((res) => res !== null);

    const newForecasts: WeatherForecast[] = [];

    validResponses.forEach(async (response, index) => {
      const forecast =
        this.weatherManagementService.mapResponseToWeatherForecast(
          response,
          cities[index],
        );

      newForecasts.push(forecast);

      await this.cacheManager.set(
        `weather_forecast:${forecast.city.toLowerCase()}`,
        forecast,
        {
          ttl: this.configService.get<number>('REDIS_WEATHER_DATA_TTL_SECONDS'),
          // Type bug
          // Stackoverflow answer - https://stackoverflow.com/a/77066815
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      );
    });

    const forecastList = [...cachedForecasts, ...newForecasts];

    const allUserSubscriptions =
      await this.subscriptionsService.getSubscriptionsByUserId(userId);

    return {
      edges: forecastList,
      paginationInfo: {
        totalCount: allUserSubscriptions.length,
      },
    };
  }
}
