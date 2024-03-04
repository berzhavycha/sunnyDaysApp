import { useEffect } from 'react';
import { ApolloError, useQuery } from '@apollo/client';

import { ONE_MINUTE, getFetchPolicyForKey } from '@/utils';
import { Env } from '@/env';
import { useSubscriptionError, useWeatherPaginationQueryOptions } from '@/context';
import { UserCitiesWeatherDocument, UserCitiesWeatherQuery, UserCitiesWeatherQueryVariables } from './queries';

type HookReturn = {
  data?: UserCitiesWeatherQuery;
  loading: boolean;
  error?: ApolloError;
  onFetchMore: (variables: Partial<UserCitiesWeatherQueryVariables>) => Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchMore: any
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
  const { paginationOptions, updatePaginationOptions, setIsFetching, isFetching, isPageCached } = useWeatherPaginationQueryOptions()
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

  const onFetchMore = async (variables: Partial<UserCitiesWeatherQueryVariables>): Promise<void> => {
    if (!isPageCached(variables)) {
      setIsFetching(true)
      await fetchMore({ variables })
      setIsFetching(false)
    }

    updatePaginationOptions(variables)
  }

  useEffect(() => {
    if (loading) {
      setError({ message: '' });
    }

    if (error) {
      handleError(error);
    }
  }, [data, loading, error]);

  return { data, loading: loading || isFetching, error, onFetchMore, fetchMore };
};
