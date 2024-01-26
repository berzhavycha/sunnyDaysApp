import { Args, Query, Resolver } from '@nestjs/graphql';
import { WeatherForecastService } from './weather-forecast.service';
import { CurrentUser } from '@modules/auth';
import { User } from '@modules/users';
import { Observable } from 'rxjs';
import { WeatherForecast } from './entities';
import { ForecastParamsInput } from './types';

@Resolver()
export class WeatherForecastResolver {
    constructor(
        private readonly weatherForecastService: WeatherForecastService
    ) { }

    @Query(() => [WeatherForecast])
    async userCitiesWeather(
        @Args('ForecastParamsInput') forecastParams: ForecastParamsInput,
        @CurrentUser() user: User
    ): Promise<Observable<WeatherForecast[]>> {
        return this.weatherForecastService.getUserCitiesWeather(user.id, forecastParams.citiesLimit, forecastParams.forecastDaysAmount);
    }
}
