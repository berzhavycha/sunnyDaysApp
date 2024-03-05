import { ApolloCache, NormalizedCache } from '@apollo/client';

import { Env } from '@/env';
import { WeatherPaginationQueryOptionsState } from '@/context';
import { UserCitiesWeatherDocument, UserCitiesWeatherQuery } from '../../useWeatherData/queries';

export const writePageCache = (
  cache: ApolloCache<NormalizedCache>,
  paginationOptions: WeatherPaginationQueryOptionsState,
  data: UserCitiesWeatherQuery['userCitiesWeather'],
): void => {
  cache.writeQuery({
    query: UserCitiesWeatherDocument,
    variables: {
      ...paginationOptions,
      forecastDaysAmount: Env.MAX_FORECAST_DAYS,
    },
    data: {
      userCitiesWeather: {
        ...data,
      },
    },
  });
};
