import { SubscriptionsService } from '@modules/subscriptions';
import { Injectable, Inject } from '@nestjs/common';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { Cache } from 'cache-manager';
import { WeatherApiResponse, IForecastDay } from './interfaces';
import { WeatherDay, WeatherForecast } from './entities';
import { WeatherApiRepository } from './weather-forecast.repository';
import { daysOfWeek } from './constants';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherForecastService {
    constructor(
        private readonly subscriptionsService: SubscriptionsService,
        private readonly weatherApiRepository: WeatherApiRepository,
        private readonly configService: ConfigService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async getUserCitiesWeather(userId: string, citiesLimit: number, forecastDaysAmount: number): Promise<Observable<WeatherForecast[]>> {
        const userSubscriptions = await this.subscriptionsService.getSubscriptionsByUserId(userId, citiesLimit);

        if (userSubscriptions.length === 0) {
            return new Observable<WeatherForecast[]>(observer => {
                observer.next([]);
                observer.complete();
            });
        }

        const cachedForecasts: WeatherForecast[] = [];

        const cachedForecastsObservables = userSubscriptions.map(async subscription => {
            const cachedForecast = await this.cacheManager.get<WeatherForecast>(`weather_forecast:${subscription.cityName}`);
            if (cachedForecast) {
                cachedForecasts.push(cachedForecast);
                return null;
            }
            return this.weatherApiRepository.getCityWeather(subscription.cityName, forecastDaysAmount);
        });

        return forkJoin(cachedForecastsObservables).pipe(
            map((responses: AxiosResponse<WeatherApiResponse>[]) => {
                const validResponses = responses.filter(res => res !== null)

                const newForecasts = this.mapResponsesToWeatherForecasts(validResponses);
                newForecasts.forEach(forecast => {
                    this.cacheManager.set(`weather_forecast:${forecast.city}`, forecast, this.configService.get<number>('REDIS_WEATHER_RESPONSE_CACHE_TIME'));
                });
                return [...cachedForecasts, ...newForecasts];
            })
        );
    }

    private mapResponsesToWeatherForecasts(responses: AxiosResponse<WeatherApiResponse>[]): WeatherForecast[] {
        return responses.map(response => {
            const { data } = response;

            return {
                city: data.location.name,
                tempCelsius: data.current.temp_c,
                tempFahrenheit: data.current.temp_f,
                text: data.current.condition.text,
                humidity: data.current.humidity,
                daysForecast: this.mapForecastDays(data.forecast.forecastday),
            };
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
