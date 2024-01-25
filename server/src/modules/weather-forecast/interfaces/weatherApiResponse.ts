import { IForecastDay } from "./forecastDay";

export interface WeatherApiResponse {
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