import { Args, Query, Resolver } from '@nestjs/graphql';
import { WeatherForecastService } from './weather-forecast.service';
import { CurrentUser } from '@modules/auth';
import { IUser } from '@modules/users';
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
        @CurrentUser() user: IUser,
    ): Promise<Observable<WeatherForecast[] | string>> {
        return this.weatherForecastService.getUserCitiesWeather(user, forecastParams.citiesLimit, forecastParams.forecastDaysAmount);
    }
}
