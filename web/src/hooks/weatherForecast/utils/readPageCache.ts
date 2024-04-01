import { ApolloCache } from '@apollo/client';

import { env } from '@/core/env';
import { PaginationQueryOptionsState } from '@/shared';

import {
  UserCitiesWeatherDocument,
  UserCitiesWeatherQuery,
  UserCitiesWeatherQueryVariables,
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
      forecastDaysAmount: env.NEXT_PUBLIC_MAX_FORECAST_DAYS,
      ...variables,
    },
  });
};
