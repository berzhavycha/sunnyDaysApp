import { useEffect } from 'react';
import {
  ApolloError,
  ApolloQueryResult,
  FetchMoreQueryOptions,
  OperationVariables,
  useQuery,
} from '@apollo/client';

import { ONE_MINUTE, getFetchPolicyForKey } from '@/utils';
import { Env } from '@/env';
import { useSubscriptionError, useWeatherPaginationQueryOptions } from '@/context';
import { UserCitiesWeatherDocument, UserCitiesWeatherQuery } from './queries';

type HookReturn = {
  data?: UserCitiesWeatherQuery;
  loading: boolean;
  error?: ApolloError;
  fetchMore: (
    fetchMoreOptions: FetchMoreQueryOptions<OperationVariables, UserCitiesWeatherQuery>,
  ) => Promise<ApolloQueryResult<UserCitiesWeatherQuery>>;
};

export type WeatherForecast = {
  id: string;
  city: string;
  celsius: number;
  fahrenheit: number;
  humidity: number;
  text: string;
  daysForecast: WeatherForecastDays[];
};

export type WeatherForecastDays = {
  text: string;
  dayOfWeek: string;
  celsius: number;
  fahrenheit: number;
  humidity: number;
};

export const useWeatherData = (): HookReturn => {
  const { setError, handleError } = useSubscriptionError();
  const { paginationOptions, isFetching, setTotalCount } = useWeatherPaginationQueryOptions();
  const { data, loading, error, fetchMore } = useQuery(UserCitiesWeatherDocument, {
    variables: {
      ...paginationOptions,
      forecastDaysAmount: Env.MAX_FORECAST_DAYS,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: getFetchPolicyForKey(
      'weatherData',
      ONE_MINUTE * Env.WEATHER_FORECAST_CACHE_MINUTES_TIME,
    ),
  });

  useEffect(() => {
    if (loading) {
      setError({ message: '' });
    }

    if (error) {
      handleError(error);
    }

    if (data) {
      setTotalCount(data.userCitiesWeather.paginationInfo?.totalCount ?? 0)
    }
  }, [data, loading, error]);

  return { data, loading: loading || isFetching, error, fetchMore };
};
