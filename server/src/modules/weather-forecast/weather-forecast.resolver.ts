import { Args, Query, Resolver } from '@nestjs/graphql';
import { WeatherForecastService } from './weather-forecast.service';
import { Observable } from 'rxjs';
import { CurrentUser } from '@modules/auth';
import { IUser } from '@modules/users';
import { WeatherForecast } from './entities';
import { ForecastParamsInput } from './dtos';

@Resolver()
export class WeatherForecastResolver {
    constructor(
        private readonly weatherForecastService: WeatherForecastService
    ) { }

    @Query(() => [WeatherForecast])
    async userCitiesWeather(
        @Args('ForecastParamsInput') forecastParams: ForecastParamsInput,
        @CurrentUser() user: IUser,
    ): Promise<Observable<WeatherForecast[]>> {
        return this.weatherForecastService.getUserCitiesWeather(user, forecastParams.citiesLimit, forecastParams.forecastDaysAmount);
    }
}
