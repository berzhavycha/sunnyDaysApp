export const weatherForecastKey = (city: string): string =>
  `weather_forecast:${city.toLowerCase()}`;

export const citySearchKey = (limit: number, cityPrefix: string): string =>
  `cities:${limit}:${cityPrefix.toLocaleLowerCase()}`;
