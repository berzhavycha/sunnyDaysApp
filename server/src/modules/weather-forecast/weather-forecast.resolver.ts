import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser, JwtAuthGuard } from '@modules/auth';

import { ForecastParamArgsDto } from './dtos';
import { PaginatedWeatherForecast } from './types';
import { WeatherForecastService } from './weather-forecast.service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class WeatherForecastResolver {
  constructor(
    private readonly weatherForecastService: WeatherForecastService,
  ) {}

  @Query(() => PaginatedWeatherForecast!, { name: 'userCitiesWeather' })
  async getUserCitiesWeather(
    @Args() forecastParams: ForecastParamArgsDto,
    @CurrentUser('id') userId: string,
  ): Promise<PaginatedWeatherForecast> {
    return this.weatherForecastService.getUserCitiesWeather({
      userId,
      ...forecastParams,
    });
  }
}
