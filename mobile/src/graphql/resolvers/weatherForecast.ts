export const weatherForecastResolvers = {
  _loading: (weatherForecast: { _loading: boolean }): boolean => Boolean(weatherForecast._loading),
  _deleted: (weatherForecast: { _deleted: boolean }): boolean => Boolean(weatherForecast._deleted),
};
