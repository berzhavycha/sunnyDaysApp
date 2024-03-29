'use client';

import { useEffect } from 'react';
import {
  ApolloError,
  ApolloQueryResult,
  FetchMoreQueryOptions,
  OperationVariables,
  skipToken,
} from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { env } from '@/core/env';
import {
  useCurrentCityWeatherInfo,
  useCurrentUser,
  useSubscriptionError,
  useWeatherCardsList,
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
    fetchMoreOptions: FetchMoreQueryOptions<OperationVariables, UserCitiesWeatherQuery | undefined>,
  ) => Promise<ApolloQueryResult<UserCitiesWeatherQuery | undefined>>;
  refetch: (
    refetchOptions?: Partial<UserCitiesWeatherQueryVariables>,
  ) => Promise<ApolloQueryResult<UserCitiesWeatherQuery | undefined>>;
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
  _deleted?: boolean;
  _loading?: boolean;
  isMocked?: boolean;
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
  const { currentUser } = useCurrentUser();
  const { paginationOptions, setTotalCount } = useWeatherPaginationInfo();
  const { setCurrentCityWeatherInfo } = useCurrentCityWeatherInfo();
  const { weatherData, setWeatherData, handleLoadingCardOnError } = useWeatherCardsList();

  // The use of skipToken prevents a request from being triggered during the sign-out process
  // when paginationOptions are about to be reset
  const { data, error, fetchMore, refetch } = useSuspenseQuery(
    UserCitiesWeatherDocument,
    currentUser
      ? {
          variables: {
            ...paginationOptions,
            forecastDaysAmount: env.NEXT_PUBLIC_MAX_FORECAST_DAYS,
          },
          fetchPolicy: getSuspenseFetchPolicyForKey(
            'weatherData',
            ONE_MINUTE * env.NEXT_PUBLIC_WEATHER_FORECAST_CACHE_MINUTES_TIME,
          ),
          errorPolicy: 'all',
        }
      : skipToken,
  );

  useEffect(() => {
    if (error) {
      handleError(error);
      handleLoadingCardOnError();
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
