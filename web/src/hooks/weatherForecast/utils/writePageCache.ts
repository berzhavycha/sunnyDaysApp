import { ApolloCache } from '@apollo/client';

import { env } from '@/core/env';
import { PaginationQueryOptionsState } from '@/shared';

import { UserCitiesWeatherDocument, UserCitiesWeatherQuery } from '../useWeatherData';

export const writePageCache = (
  cache: ApolloCache<object>,
  paginationOptions: PaginationQueryOptionsState,
  data: UserCitiesWeatherQuery['userCitiesWeather'],
): void => {
  cache.writeQuery({
    query: UserCitiesWeatherDocument,
    variables: {
      ...paginationOptions,
      forecastDaysAmount: env.NEXT_PUBLIC_MAX_FORECAST_DAYS,
    },
    data: {
      userCitiesWeather: {
        ...data,
      },
    },
  });
};
