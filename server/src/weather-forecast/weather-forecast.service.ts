import { SubscriptionsService } from '@subscriptions';
import { Injectable } from '@nestjs/common';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { WeatherApiResponse, IForecastDay } from './interfaces';
import { WeatherDay, WeatherForecast } from './entities';
import { WeatherApiRepository } from './weather-forecast.repository';
import { daysOfWeek } from './constants';


@Injectable()
export class WeatherForecastService {
    constructor(
        private readonly subscriptionsService: SubscriptionsService,
        private readonly weatherApiRepository: WeatherApiRepository
    ) { }

    async getUserCitiesWeather(userId: string, citiesLimit: number, forecastDaysAmount: number): Promise<Observable<WeatherForecast[]>> {
        const userSubscriptions = await this.subscriptionsService.getSubscriptionsByUserId(userId, citiesLimit);

        const requests = userSubscriptions.map(subscription => this.weatherApiRepository.getCityWeather(subscription.cityName, forecastDaysAmount));

        return forkJoin(requests).pipe(
            map((responses: AxiosResponse<WeatherApiResponse>[]) => this.mapResponsesToWeatherForecasts(responses)),
        );
    }

    private mapResponsesToWeatherForecasts(responses: AxiosResponse<WeatherApiResponse>[]): WeatherForecast[] {
        return responses.map(response => {
            const { data } = response

            return {
                city: data.location.name,
                tempCelsius: data.current.temp_c,
                tempFahrenheit: data.current.temp_f,
                text: data.current.condition.text,
                humidity: data.current.humidity,
                daysForecast: this.mapForecastDays(data.forecast.forecastday),
            }
        });
    }

    private mapForecastDays(forecastDays: IForecastDay[]): WeatherDay[] {
        return forecastDays.map(forecast => {
            const { date, day } = forecast;
            const dateInstance = new Date(date);

            const dayOfWeek = daysOfWeek[dateInstance.getDay()];

            return {
                tempCelsius: day.avgtemp_c,
                tempFahrenheit: day.avgtemp_f,
                text: day.condition.text,
                humidity: day.avghumidity,
                dayOfWeek: dayOfWeek,
            };
        });
    }
}