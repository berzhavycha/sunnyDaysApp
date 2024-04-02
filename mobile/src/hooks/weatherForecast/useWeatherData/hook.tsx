import {
  ApolloError,
  ApolloQueryResult,
  FetchMoreQueryOptions,
  OperationVariables,
  useQuery,
} from '@apollo/client';
import { useEffect } from 'react';

import { useSubscriptionError, useWeatherCardsList, useWeatherPaginationInfo } from '@/context';
import { Env } from '@/env';
import { getFetchPolicyForKey, ONE_MINUTE } from '@/shared';

import {
  UserCitiesWeatherDocument,
  UserCitiesWeatherQuery,
  UserCitiesWeatherQueryVariables,
} from './queries';

type HookReturn = {
  data?: UserCitiesWeatherQuery;
  loading: boolean;
  error?: ApolloError;
  fetchMore: (
    fetchMoreOptions: FetchMoreQueryOptions<OperationVariables, UserCitiesWeatherQuery>,
  ) => Promise<ApolloQueryResult<UserCitiesWeatherQuery>>;
  refetch: (
    refetchOptions?: Partial<UserCitiesWeatherQueryVariables>,
  ) => Promise<ApolloQueryResult<UserCitiesWeatherQuery | undefined>>;
};

export type WeatherForecast = {
  id: string;
  city: string;
  celsius: number;
  fahrenheit: number;
  humidity: number;
  text: string;
  daysForecast: WeatherForecastDays[];
  _deleted?: boolean;
  _loading?: boolean;
};

export type WeatherForecastDays = {
  id: string;
  text: string;
  dayOfWeek: string;
  celsius: number;
  fahrenheit: number;
  humidity: number;
};

export const useWeatherData = (): HookReturn => {
  const { errorHandler } = useSubscriptionError();
  const { paginationOptions, setTotalCount, isFetching } = useWeatherPaginationInfo();
  const { weatherData, setWeatherData, loadingCardErrorHandler } = useWeatherCardsList();
  const { data, loading, error, fetchMore, refetch } = useQuery(UserCitiesWeatherDocument, {
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
    if (error) {
      errorHandler(error);
      loadingCardErrorHandler();
    }

    if (data && data.userCitiesWeather) {
      setTotalCount(data.userCitiesWeather.paginationInfo?.totalCount ?? 0);
      setWeatherData(data);
    }
  }, [data, loading, error]);

  return { data: weatherData, loading: loading || isFetching, error, fetchMore, refetch };
};
