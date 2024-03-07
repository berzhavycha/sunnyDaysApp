import { IForecastDay } from './forecast-day';

export interface IWeatherApiResponse {
  location: {
    name: string;
    country: string
  };
  current: {
    temp_c: number;
    temp_f: number;
    precip_mm: number;
    wind_kph: number;
    condition: {
      text: string;
    };
    humidity: number;
  };
  forecast: {
    forecastday: IForecastDay[];
  };
}
