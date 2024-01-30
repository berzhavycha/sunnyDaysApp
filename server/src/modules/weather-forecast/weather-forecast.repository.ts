import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { WeatherApiResponse } from './interfaces';


@Injectable()
export class WeatherApiRepository {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) { }

    async getCityWeather(cityName: string, forecastDays: number): Promise<AxiosResponse<WeatherApiResponse>> {
        const weatherApiKey = this.configService.get<string>('WEATHER_API_KEY');
        const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${cityName}&days=${forecastDays}`;
        return this.httpService.get(apiUrl, {
            validateStatus: function (status) {
                return status >= 200 && status < 300;
            }
        })
            .toPromise();
    }
}
