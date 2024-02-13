import { ApolloError, useQuery } from '@apollo/client';

import { ONE_MINUTE, getFetchPolicyForKey } from '@/utils';
import { UserCitiesWeatherDocument, UserCitiesWeatherQuery } from './queries';
import { Env } from '@/env';

type WeatherDataReturn = {
  data: UserCitiesWeatherQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

export const useWeatherData = (): WeatherDataReturn => {
  const { data, loading, error } = useQuery(UserCitiesWeatherDocument, {
    variables: {
      citiesLimit: Env.MAX_WEATHER_CITIES_AMOUNT,
      forecastDaysAmount: Env.MAX_FORECAST_DAYS,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: getFetchPolicyForKey('weatherData', ONE_MINUTE * Env.WEATHER_FORECAST_CACHE_TIME),
  });

  return { data, loading, error };
};
