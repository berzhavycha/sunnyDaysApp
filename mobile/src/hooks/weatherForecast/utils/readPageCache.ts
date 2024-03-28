import { ApolloCache } from '@apollo/client';

import { PaginationQueryOptionsState } from '@/shared';
import { Env } from '@/env';
import {
  UserCitiesWeatherQueryVariables,
  UserCitiesWeatherQuery,
  UserCitiesWeatherDocument,
} from '../useWeatherData/queries';

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
