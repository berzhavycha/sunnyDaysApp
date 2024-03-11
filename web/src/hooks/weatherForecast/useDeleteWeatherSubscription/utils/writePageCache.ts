import { ApolloCache, NormalizedCache } from '@apollo/client';

import { WeatherPaginationQueryOptionsState } from '@/context';
import { UserCitiesWeatherDocument, UserCitiesWeatherQuery } from '../../useWeatherData/queries';
import { MAX_FORECAST_DAYS } from '@/global';

export const writePageCache = (
  cache: ApolloCache<NormalizedCache>,
  paginationOptions: WeatherPaginationQueryOptionsState,
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
