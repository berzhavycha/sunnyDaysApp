import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { daysOfWeek, upperCaseEveryFirstLetter } from '@shared';

import { IForecastDay, IWeatherApiResponse } from './interfaces';
import { WeatherDay, WeatherForecast } from './types';

@Injectable()
export class WeatherManagementService {
  public mapResponseToWeatherForecast(
    response: AxiosResponse<IWeatherApiResponse>,
    city: string,
  ): WeatherForecast {
    const { data } = response;

    return {
      id: uuidv4(),
      city: upperCaseEveryFirstLetter(city),
      celsius: data.current.temp_c,
      fahrenheit: data.current.temp_f,
      text: data.current.condition.text,
      humidity: data.current.humidity,
      precip: data.current.precip_mm,
      windSpeed: data.current.wind_kph,
      time: data.location.localtime,
      daysForecast: this.mapForecastDays(data.forecast.forecastday),
    };
  }

  public mapForecastDays(forecastDays: IForecastDay[]): WeatherDay[] {
    return forecastDays.map((forecast) => {
      const { date, day } = forecast;
      const dateInstance = new Date(date);

      const dayOfWeek = daysOfWeek[dateInstance.getDay()];

      return {
        id: uuidv4(),
        celsius: day.avgtemp_c,
        fahrenheit: day.avgtemp_f,
        text: day.condition.text,
        humidity: day.avghumidity,
        precip: day.totalprecip_mm,
        windSpeed: day.maxwind_kph,
        maxCelsius: day.maxtemp_c,
        minCelsius: day.mintemp_c,
        maxFahrenheit: day.maxtemp_f,
        minFahrenheit: day.mintemp_f,
        dayOfWeek,
      };
    });
  }
}
