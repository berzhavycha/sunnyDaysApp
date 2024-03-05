export const weatherForecastResolvers = {
  _deleted: (weatherForecast: { _deleted: boolean }): boolean => Boolean(weatherForecast._deleted),
};
