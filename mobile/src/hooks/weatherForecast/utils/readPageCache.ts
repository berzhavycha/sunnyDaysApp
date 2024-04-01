import { ApolloCache } from '@apollo/client';

import { Env } from '@/env';
import { PaginationQueryOptionsState } from '@/shared';

import {
  UserCitiesWeatherDocument,
  UserCitiesWeatherQuery,
  UserCitiesWeatherQueryVariables,
} from '../useWeatherData';

export const readPageCache = (
  cache: ApolloCache<object>,
  paginationOptions: PaginationQueryOptionsState,
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
