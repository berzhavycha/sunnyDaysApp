'use client'

import { useEffect } from 'react';
import {
  ApolloError,
  ApolloQueryResult,
  FetchMoreQueryOptions,
  OperationVariables,
  useQuery,
} from '@apollo/client';

import { ONE_MINUTE, getFetchPolicyForKey } from '@/utils';
import { useCurrentCityWeatherInfo, useSubscriptionError, useWeatherPaginationQueryOptions } from '@/context';
import { UserCitiesWeatherDocument, UserCitiesWeatherQuery } from './queries';
import { MAX_FORECAST_DAYS, WEATHER_FORECAST_CACHE_MINUTES_TIME } from '@/global';

type HookReturn = {
  data?: UserCitiesWeatherQuery;
  loading: boolean;
  error?: ApolloError;
  fetchMore: (
    fetchMoreOptions: FetchMoreQueryOptions<OperationVariables, UserCitiesWeatherQuery>,
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
  const { paginationOptions, isFetching } = useWeatherPaginationQueryOptions();
  const { setCurrentCityWeatherInfo } = useCurrentCityWeatherInfo()
  const { data, loading, error, fetchMore } = useQuery(UserCitiesWeatherDocument, {
    variables: {
      ...paginationOptions,
      forecastDaysAmount: MAX_FORECAST_DAYS,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: getFetchPolicyForKey(
      'weatherData',
      ONE_MINUTE * WEATHER_FORECAST_CACHE_MINUTES_TIME,
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
      setCurrentCityWeatherInfo({ info: data.userCitiesWeather.edges[0] })
    }
  }, [data, loading, error]);

  return { data, loading: loading || isFetching, error, fetchMore };
};
