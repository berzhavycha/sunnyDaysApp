'use client';

import { useEffect, useState } from 'react';
import {
  ApolloError,
  ApolloQueryResult,
  FetchMoreQueryOptions,
  OperationVariables,
} from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { env } from '@/core/env'
import {
  useCurrentCityWeatherInfo,
  useSubscriptionError,
  useWeatherPaginationInfo,
} from '@/context';
import { getSuspenseFetchPolicyForKey, ONE_MINUTE } from '@/shared';
import {
  UserCitiesWeatherDocument,
  UserCitiesWeatherQuery,
  UserCitiesWeatherQueryVariables,
} from './queries';

type HookReturn = {
  data: UserCitiesWeatherQuery | null;
  error?: ApolloError;
  fetchMore: (
    fetchMoreOptions: FetchMoreQueryOptions<OperationVariables, UserCitiesWeatherQuery>,
  ) => Promise<ApolloQueryResult<UserCitiesWeatherQuery>>;
  refetch: (
    refetchOptions?: Partial<UserCitiesWeatherQueryVariables>,
  ) => Promise<ApolloQueryResult<UserCitiesWeatherQuery>>;
};

export type WeatherForecast = {
  id?: string;
  city: string;
  celsius: number;
  fahrenheit: number;
  humidity: number;
  text: string;
  precip: number;
  windSpeed: number;
  time?: string;
  daysForecast?: WeatherForecastDays[];
};

export type WeatherForecastDays = {
  text: string;
  dayOfWeek: string;
  celsius: number;
  fahrenheit: number;
  humidity: number;
  precip: number;
  windSpeed: number;
  minCelsius: number;
  maxCelsius: number;
  minFahrenheit: number;
  maxFahrenheit: number;
};

export const useWeatherData = (): HookReturn => {
  const { setError, handleError } = useSubscriptionError();
  const { paginationOptions, setTotalCount } = useWeatherPaginationInfo();
  const { setCurrentCityWeatherInfo } = useCurrentCityWeatherInfo();
  const [weatherData, setWeatherData] = useState<UserCitiesWeatherQuery | null>(null);
  const { data, error, fetchMore, refetch } = useSuspenseQuery(UserCitiesWeatherDocument, {
    variables: {
      ...paginationOptions,
      forecastDaysAmount: env.NEXT_PUBLIC_MAX_FORECAST_DAYS,
    },
    fetchPolicy: getSuspenseFetchPolicyForKey(
      'weatherData',
      ONE_MINUTE * env.NEXT_PUBLIC_WEATHER_FORECAST_CACHE_MINUTES_TIME,
    ),
  });

  useEffect(() => {
    if (error) {
      handleError(error);
    }

    if (data && data.userCitiesWeather) {
      setTotalCount(data.userCitiesWeather.paginationInfo?.totalCount ?? 0);
      setCurrentCityWeatherInfo({ info: data.userCitiesWeather.edges[0] });
      setError({ message: '' });
      setWeatherData(data);
    }
  }, [data, error]);

  return { data: weatherData, error, fetchMore, refetch };
};
