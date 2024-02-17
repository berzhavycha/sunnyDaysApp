import { UserCitiesWeatherQuery } from "@/hooks/weatherForecast/useWeatherData/queries";

export const userCitiesWeather = {
    merge: (existing: UserCitiesWeatherQuery[] | undefined, incoming: UserCitiesWeatherQuery[]): UserCitiesWeatherQuery[] => {
        return incoming;
    }
};