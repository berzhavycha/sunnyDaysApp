import { WeatherForecast } from '../../useWeatherData';
import { UserCitiesWeatherQuery } from '../../useWeatherData/queries';

const WEATHER_FORECAST_TO_DELETE: WeatherForecast = {
  id: '',
  city: '',
  text: '',
  celsius: 0,
  fahrenheit: 0,
  humidity: 0,
  daysForecast: [{ id: '', text: '', celsius: 0, fahrenheit: 0, humidity: 0, dayOfWeek: '' }],
}

export const purgePageCache = (
  edges: UserCitiesWeatherQuery['userCitiesWeather']['edges'],
  cityName: string,
): UserCitiesWeatherQuery['userCitiesWeather']['edges'] | undefined => {
  return edges?.map((edge) => {
    if (edge.city === cityName) {
      return { ...edge, _deleted: true };
    } 
   
    return edge;
  });
};
