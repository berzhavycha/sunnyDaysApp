import { useEffect } from 'react';
import { ApolloError, useQuery } from '@apollo/client';

import { ONE_MINUTE, getFetchPolicyForKey } from '@/utils';
import { Env } from '@/env';
import { useSubscriptionError } from '@/context';
import { UserCitiesWeatherDocument, UserCitiesWeatherQuery } from './queries';

type HookReturn = {
  data?: UserCitiesWeatherQuery;
  loading: boolean;
  error?: ApolloError;
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

    if (error?.graphQLErrors[0].extensions.code === 'BAD_REQUEST') {
      setError({ message: error?.message ?? ''});
    } else if (error) {
      setError({ message: 'Oops...Something went wrong!' });
    }
  }, [data, loading, error]);


  return { data, loading, error };
};
