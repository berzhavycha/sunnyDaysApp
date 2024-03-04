import { Env } from '@/env';
import { UserCitiesWeatherQuery } from '../useWeatherData/queries';

export const validateCityRules = [
  {
    validator: (city: string): boolean => !!city.trim(),
    message: 'Please enter the city!',
  },
  {
    validator: (_city: string, data: UserCitiesWeatherQuery | undefined): boolean => {
      return (data?.userCitiesWeather.paginationInfo?.totalCount ?? 0) < Env.MAX_WEATHER_CITIES_AMOUNT;
    },
    message: `You cannot have more than ${Env.MAX_WEATHER_CITIES_AMOUNT} cities.`,
  },
];
