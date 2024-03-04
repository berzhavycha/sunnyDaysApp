import { Resolvers } from "@apollo/client";

import { weatherForecastResolvers } from "./weatherForecast";

export const resolvers: Resolvers = {
    WeatherForecast: { ...weatherForecastResolvers }
}