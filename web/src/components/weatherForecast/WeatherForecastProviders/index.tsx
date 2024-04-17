import { CurrentCityWeatherInfoProvider, WeatherCardsListProvider } from "@/context";
import { getWeatherForecasts } from "@/services/index-server";
import { FC, PropsWithChildren } from "react";

export const WeatherForecastProviders: FC<PropsWithChildren> = async ({ children }) => {
    const weatherResponse = await getWeatherForecasts();

    return (
        <CurrentCityWeatherInfoProvider weatherResponse={JSON.stringify(weatherResponse)}>
            <WeatherCardsListProvider weatherResponse={JSON.stringify(weatherResponse)}>
                {children}
            </WeatherCardsListProvider>
        </CurrentCityWeatherInfoProvider>
    )
}