import { ApolloCache } from '@apollo/client';

import { PaginationQueryOptionsState } from '@/shared';
import { Env } from '@/env';
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
      forecastDaysAmount: Env.MAX_FORECAST_DAYS,
    },
    data: {
      userCitiesWeather: {
        ...data,
      },
    },
  });
};
