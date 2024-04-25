import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { Order, weatherForecastKey } from '@shared';

import { SubscriptionsService } from '@modules/subscriptions';
import {
  WeatherForecast,
  WeatherManagementService,
} from '@modules/weather-management';

import { PaginatedWeatherForecast } from './types';

@Injectable()
export class WeatherForecastService {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly weatherManagementService: WeatherManagementService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

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
        weatherForecastKey(name),
      );
      if (cachedForecast) {
        cachedForecasts.push(cachedForecast);
        continue;
      }

      cities.push(name);

      weatherForecastsPromises.push(
        this.weatherManagementService.getCityWeather(name, forecastDaysAmount),
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

      await this.weatherManagementService.cacheForecast(forecast);
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
