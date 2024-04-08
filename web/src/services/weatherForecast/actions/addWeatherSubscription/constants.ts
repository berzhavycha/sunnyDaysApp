import { env } from '@/core/env';

import { UserCitiesWeatherQuery } from '../../fetchers/index-server';

export const validateCityRules = [
  {
    validator: (city: string): boolean => !!city.trim(),
    message: 'Please enter the city!',
  },
  {
    validator: (_city: string, data: UserCitiesWeatherQuery | null): boolean => {
      return (
        (data?.userCitiesWeather.paginationInfo?.totalCount ?? 0) <
        env.NEXT_PUBLIC_MAX_WEATHER_CITIES_AMOUNT
      );
    },
    message: `You cannot have more than ${env.NEXT_PUBLIC_MAX_WEATHER_CITIES_AMOUNT} cities.`,
  },
];
