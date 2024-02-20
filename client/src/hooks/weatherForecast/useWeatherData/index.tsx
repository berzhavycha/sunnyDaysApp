import { useEffect } from 'react';
import { ApolloError, useQuery } from '@apollo/client';

import { ONE_MINUTE, getFetchPolicyForKey } from '@/utils';
import { UNEXPECTED_ERROR_MESSAGE } from '@/graphql';
import { Env } from '@/env';
import { useSubscriptionError } from '@/context';
import { UserCitiesWeatherDocument, UserCitiesWeatherQuery } from './queries';

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
      citiesLimit: Env.MAX_WEATHER_CITIES_AMOUNT,
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
      if (error.graphQLErrors[0]?.extensions.originalError) {
        setError({ message: error.graphQLErrors[0].extensions.originalError.message });
      } else {
        setError({ message: UNEXPECTED_ERROR_MESSAGE });
      }
    }
  }, [data, loading, error]);

  return { data, loading, error };
};
