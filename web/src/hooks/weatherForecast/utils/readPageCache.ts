import { ApolloCache } from '@apollo/client';

import { PaginationQueryOptionsState } from '@/shared';
import {
  UserCitiesWeatherQueryVariables,
  UserCitiesWeatherQuery,
  UserCitiesWeatherDocument,
} from '../useWeatherData/queries';
import { MAX_FORECAST_DAYS } from '@/global';

export const readPageCache = (
  cache: ApolloCache<object>,
  paginationOptions: PaginationQueryOptionsState,
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
