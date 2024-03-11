'use client';

import { useEffect } from 'react';
import {
  ApolloError,
  ApolloQueryResult,
  FetchMoreQueryOptions,
  OperationVariables,
  useSuspenseQuery,
} from '@apollo/client';

import { MAX_FORECAST_DAYS } from '@/global';
import {
  useCurrentCityWeatherInfo,
  useSubscriptionError,
  useWeatherPaginationQueryOptions,
} from '@/context';
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
  const { paginationOptions, isFetching, setTotalCount } = useWeatherPaginationQueryOptions();
  const { setCurrentCityWeatherInfo } = useCurrentCityWeatherInfo();
  const { data, error, fetchMore } = useSuspenseQuery(UserCitiesWeatherDocument, {
    variables: {
      ...paginationOptions,
      forecastDaysAmount: MAX_FORECAST_DAYS,
    },
    fetchPolicy: 'cache-first',
    // notifyOnNetworkStatusChange: true,
    // fetchPolicy: getFetchPolicyForKey(
    //   'weatherData',
    //   ONE_MINUTE * WEATHER_FORECAST_CACHE_MINUTES_TIME,
    // ),
  });

  console.log(data.userCitiesWeather.edges.map(item => item.city))

  useEffect(() => {
    // if (loading) {
    //   setError({ message: '' });
    // }

    if (error) {
      handleError(error);
    }

    if (data) {
      setTotalCount(data.userCitiesWeather.paginationInfo?.totalCount ?? 0);
      setCurrentCityWeatherInfo({ info: data.userCitiesWeather.edges[0] });
    }
  }, [data, error, setError, handleError, setCurrentCityWeatherInfo]);

  return { data, loading: isFetching, error, fetchMore };
};
