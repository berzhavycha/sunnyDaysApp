'use client';

import { useEffect } from 'react';
import {
  ApolloError,
  ApolloQueryResult,
  FetchMoreQueryOptions,
  OperationVariables,
  useSuspenseQuery,
} from '@apollo/client';

import { MAX_FORECAST_DAYS, WEATHER_FORECAST_CACHE_MINUTES_TIME } from '@/global';
import {
  useCurrentCityWeatherInfo,
  useSubscriptionError,
  useWeatherPaginationQueryOptions,
} from '@/context';
import { UserCitiesWeatherDocument, UserCitiesWeatherQuery } from './queries';
import { getSuspenseFetchPolicyForKey, ONE_MINUTE } from '@/shared';

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
  const { paginationOptions, setTotalCount } = useWeatherPaginationQueryOptions();
  const { setCurrentCityWeatherInfo } = useCurrentCityWeatherInfo();
  const { data, error, fetchMore } = useSuspenseQuery(UserCitiesWeatherDocument, {
    variables: {
      ...paginationOptions,
      forecastDaysAmount: MAX_FORECAST_DAYS,
    },
    fetchPolicy: getSuspenseFetchPolicyForKey(
      'weatherData',
      ONE_MINUTE * WEATHER_FORECAST_CACHE_MINUTES_TIME,
    ),
  });

  useEffect(() => {
    if (error) {
      handleError(error);
    }

    if (data) {
      setTotalCount(data.userCitiesWeather.paginationInfo?.totalCount ?? 0);
      setCurrentCityWeatherInfo({ info: data.userCitiesWeather.edges[0] });
      setError({ message: '' })
    }
  }, [data]);

  return { data, loading: false, error, fetchMore };
};
