import { ApolloCache, NormalizedCache } from '@apollo/client';

import { WeatherPaginationQueryOptionsState } from '@/context';
import {
  UserCitiesWeatherQueryVariables,
  UserCitiesWeatherQuery,
  UserCitiesWeatherDocument,
} from '../../useWeatherData/queries';
import { MAX_FORECAST_DAYS } from '@/global';

export const readPageCache = (
  cache: ApolloCache<NormalizedCache>,
  paginationOptions: WeatherPaginationQueryOptionsState,
  variables?: Partial<UserCitiesWeatherQueryVariables>,
): UserCitiesWeatherQuery | null => {
  return cache.readQuery({
    query: UserCitiesWeatherDocument,
    variables: {
      ...paginationOptions,
      forecastDaysAmount: MAX_FORECAST_DAYS,
      ...variables,
    },
  });
};
