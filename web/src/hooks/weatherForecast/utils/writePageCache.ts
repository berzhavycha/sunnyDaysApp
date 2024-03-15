import { ApolloCache } from '@apollo/client';

import { PaginationQueryOptionsState } from '@/shared';
import { UserCitiesWeatherDocument, UserCitiesWeatherQuery } from '../useWeatherData/queries';
import { MAX_FORECAST_DAYS } from '@/global';

export const writePageCache = (
  cache: ApolloCache<object>,
  paginationOptions: PaginationQueryOptionsState,
  data: UserCitiesWeatherQuery['userCitiesWeather'],
): void => {
  cache.writeQuery({
    query: UserCitiesWeatherDocument,
    variables: {
      ...paginationOptions,
      forecastDaysAmount: MAX_FORECAST_DAYS,
    },
    data: {
      userCitiesWeather: {
        ...data,
      },
    },
  });
};
