import { ApolloCache, NormalizedCache } from '@apollo/client';

import { Env } from '@/env';
import { WeatherPaginationQueryOptionsState } from '@/context';
import {
  UserCitiesWeatherQueryVariables,
  UserCitiesWeatherQuery,
  UserCitiesWeatherDocument,
} from '../../useWeatherData/queries';

export const readPageCache = (
  cache: ApolloCache<NormalizedCache>,
  paginationOptions: WeatherPaginationQueryOptionsState,
  variables?: Partial<UserCitiesWeatherQueryVariables>,
): UserCitiesWeatherQuery | null => {
  return cache.readQuery({
    query: UserCitiesWeatherDocument,
    variables: {
      ...paginationOptions,
      forecastDaysAmount: Env.MAX_FORECAST_DAYS,
      ...variables,
    },
  });
};
