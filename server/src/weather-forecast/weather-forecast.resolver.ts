import { Query, Resolver } from '@nestjs/graphql';
import { WeatherForecastService } from './weather-forecast.service';
import { CurrentUser } from '@auth';
import { User } from '@users';
import { Observable } from 'rxjs';
import { WeatherForecast } from './entities/weather.entity';

@Resolver()
export class WeatherForecastResolver {
    constructor(
        private readonly weatherForecastService: WeatherForecastService
    ) { }

    @Query(() => [WeatherForecast])
    async getUserCitiesWeather(@CurrentUser() user: User): Promise<Observable<WeatherForecast[]>> {
        const result = await this.weatherForecastService.getUserCitiesWeather(user.userId);
        return result
    }
}
