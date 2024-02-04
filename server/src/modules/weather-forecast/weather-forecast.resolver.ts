import { Args, Query, Resolver } from '@nestjs/graphql';
import { WeatherForecastService } from './weather-forecast.service';
import { CurrentUser } from '@modules/auth';
import { WeatherForecast } from './types';
import { ForecastParamArgs } from './dtos';

@Resolver()
export class WeatherForecastResolver {
  constructor(
    private readonly weatherForecastService: WeatherForecastService,
  ) { }

  @Query(() => [WeatherForecast]!, { name: 'userCitiesWeather' })
  async getUserCitiesWeather(
    @Args() forecastParams: ForecastParamArgs,
    @CurrentUser('id') id: string,
  ): Promise<WeatherForecast[]> {
    return this.weatherForecastService.getUserCitiesWeather(
      id,
      forecastParams.citiesLimit,
      forecastParams.forecastDaysAmount,
    );
  }
}
