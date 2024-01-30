import { SubscriptionsService } from '@modules/subscriptions';
import { Injectable, Inject, HttpException } from '@nestjs/common';
import { forkJoin, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { Cache } from 'cache-manager';
import { WeatherApiResponse, IForecastDay } from './interfaces';
import { WeatherDay, WeatherForecast } from './entities';
import { WeatherApiRepository } from './weather-forecast.repository';
import { daysOfWeek } from './constants';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { IUser } from '@modules/users';


@Injectable()
export class WeatherForecastService {
    constructor(
        private readonly subscriptionsService: SubscriptionsService,
        private readonly weatherApiRepository: WeatherApiRepository,
        private readonly configService: ConfigService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async getUserCitiesWeather(user: IUser, citiesLimit: number, forecastDaysAmount: number): Promise<Observable<WeatherForecast[] | string>> {
        try {
            let problematicSubscription: string;
            const userSubscriptions = await this.subscriptionsService.getSubscriptionsByUserId(user.id, citiesLimit);

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

                return this.weatherApiRepository.getCityWeather(subscription.cityName, forecastDaysAmount).catch((error) => {
                    problematicSubscription = subscription.cityName
                    throw error
                });
            });

            return forkJoin(cachedForecastsObservables).pipe(
                map((responses: AxiosResponse<WeatherApiResponse>[]) => {
                    const validResponses = responses.filter(res => res !== null)

                    const newForecasts = this.mapResponsesToWeatherForecasts(validResponses);
                    newForecasts.forEach(forecast => {
                        this.cacheManager.set(`weather_forecast:${forecast.city}`, forecast, { ttl: this.configService.get<number>('REDIS_WEATHER_RESPONSE_TTL') } as any);
                    });
                    return [...cachedForecasts, ...newForecasts];
                }),
                catchError(e => {
                    this.subscriptionsService.deleteSubscription(problematicSubscription, user)
                    throw new HttpException(e.response.data.error.message, e.response.status);
                }),
            );
        } catch (error) {
            console.log(error)
        }

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
                dayOfWeek,
            };
        });
    }
}
