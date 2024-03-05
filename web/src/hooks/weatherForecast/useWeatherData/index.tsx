'use client'

import { useEffect } from 'react';
import { ApolloError, useQuery } from '@apollo/client';

import { ONE_MINUTE, getFetchPolicyForKey } from '@/utils';
import { UNEXPECTED_ERROR_MESSAGE } from '@/graphql';
import { useSubscriptionError } from '@/context';
import { UserCitiesWeatherDocument, UserCitiesWeatherQuery } from './queries';
import { MAX_WEATHER_CITIES_AMOUNT, MAX_FORECAST_DAYS, WEATHER_FORECAST_CACHE_MINUTES_TIME } from '@/global';

type HookReturn = {
  data?: UserCitiesWeatherQuery;
  loading: boolean;
  error?: ApolloError;
};

export type WeatherForecast = {
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
  const { setError } = useSubscriptionError();
  const { data, loading, error } = useQuery(UserCitiesWeatherDocument, {
    variables: {
      citiesLimit: MAX_WEATHER_CITIES_AMOUNT,
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
      if (error.graphQLErrors[0]?.extensions.originalError) {
        setError({ message: error.graphQLErrors[0].extensions.originalError.message });
      } else {
        setError({ message: UNEXPECTED_ERROR_MESSAGE });
      }
    }
  }, [data, loading, error]);

  return { data, loading, error };
};
