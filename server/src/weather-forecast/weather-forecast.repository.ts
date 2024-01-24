import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { WEATHER_API_KEY } from '@global';
import { WeatherApiResponse } from './interfaces';

@Injectable()
export class WeatherApiRepository {
    constructor(private readonly httpService: HttpService) { }

    async getCityWeather(cityName: string, forecastDays: number): Promise<AxiosResponse<WeatherApiResponse>> {
        const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${cityName}&days=${forecastDays}`;
        return this.httpService.get(apiUrl).toPromise();
    }
}
