import { Args, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '@modules/auth';
import { WeatherForecastService } from './weather-forecast.service';
import { ForecastParamArgsDto } from './dtos';
import { PaginatedWeatherForecast } from './types';

@Resolver()
export class WeatherForecastResolver {
  constructor(
    private readonly weatherForecastService: WeatherForecastService,
  ) { }

  @Query(() => PaginatedWeatherForecast!, { name: 'userCitiesWeather' })
  async getUserCitiesWeather(
    @Args() forecastParams: ForecastParamArgsDto,
    @CurrentUser('id') id: string,
  ): Promise<PaginatedWeatherForecast> {
    return this.weatherForecastService.getUserCitiesWeather({
      userId: id,
      limit: forecastParams.limit,
      offset: forecastParams.offset,
      order: forecastParams.order,
      forecastDaysAmount: forecastParams.forecastDaysAmount,
    });
  }
}
