import { Args, Query, Resolver } from '@nestjs/graphql';
import { WeatherForecastService } from './weather-forecast.service';
import { CurrentUser } from '@auth';
import { User } from '@users';
import { Observable } from 'rxjs';
import { WeatherForecast } from './entities';

@Resolver()
export class WeatherForecastResolver {
    constructor(
        private readonly weatherForecastService: WeatherForecastService
    ) { }

    @Query(() => [WeatherForecast])
    async getUserCitiesWeather(
        @Args('citiesLimit') citiesLimit: number,
        @Args('forecastDaysAmount') forecastDaysAmount: number,
        @CurrentUser() user: User
    ): Promise<Observable<WeatherForecast[]>> {
        return this.weatherForecastService.getUserCitiesWeather(user.userId, citiesLimit, forecastDaysAmount);
    }
}
