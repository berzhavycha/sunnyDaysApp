import { ApolloCache } from '@apollo/client';

import { PaginationQueryOptionsState } from '@/shared';
import { env } from '@/core/env';
import { UserCitiesWeatherDocument, UserCitiesWeatherQuery } from '../useWeatherData/queries';

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
