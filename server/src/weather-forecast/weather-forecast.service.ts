import { SubscriptionsService } from './../subscriptions/subscriptions.service';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { OPEN_WEATHER_API_KEY } from '@global';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { WeatherForecast } from './entities/weather.entity';

export interface IForecastDay {
    day: {
        avgtemp_c: number,
        avgtemp_f: number,
        condition: {
            text: string
        }
        avghumidity: number
    }
}

export interface OpenWeatherApiResponse {
    location: {
        name: string;
    };
    current: {
        temp_c: number,
        temp_f: number,
        condition: {
            text: string
        }
        humidity: number,
    }
    forecast: {
        forecastday: IForecastDay[]
    }
}

@Injectable()
export class WeatherForecastService {
    constructor(
        private readonly subscriptionsService: SubscriptionsService,
        private readonly httpService: HttpService
    ) { }

    async getUserCitiesWeather(userId: string): Promise<Observable<WeatherForecast[]>> {
        const userSubscriptions = await this.subscriptionsService.getSubscriptionsByUserId(userId, 10)

        const requests = userSubscriptions.map((subscription) => {
            const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${OPEN_WEATHER_API_KEY}&q=${subscription.cityName}&days=${5}`
            return this.httpService.get(apiUrl);
        });

        return forkJoin(requests).pipe(
            map((responses: AxiosResponse<OpenWeatherApiResponse>[]) => {
                return responses.map((response) => ({
                    city: response.data.location.name,
                    tempCelsius: response.data.current.temp_c,
                    tempFahrenheit: response.data.current.temp_f,
                    text: response.data.current.condition.text,
                    humidity: response.data.current.humidity,
                    daysForecast: response.data.forecast.forecastday.map((forecast) => {
                        return {
                            tempCelsius: forecast.day.avgtemp_c,
                            tempFahrenheit: forecast.day.avgtemp_f,
                            text: forecast.day.condition.text,
                            humidity: forecast.day.avghumidity,
                        }
                    }),
                }));
            }),
        );
    }
}
