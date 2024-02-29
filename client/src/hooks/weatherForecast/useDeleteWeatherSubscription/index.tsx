import { useMutation } from '@apollo/client';
import { useEffect } from 'react';

import { Env } from '@/env';
import { useSubscriptionError } from '@/context';
import { UNEXPECTED_ERROR_MESSAGE } from '@/graphql';
import { UserCitiesWeatherDocument } from '../useWeatherData/queries';
import { DeleteWeatherSubscriptionDocument } from './mutations';

type HookReturn = {
  deleteSubscription: (city: string) => Promise<void>;
};

export const useDeleteWeatherSubscription = (): HookReturn => {
  const { setError, handleError } = useSubscriptionError();
  const [deleteWeatherSubscription, { error }] = useMutation(DeleteWeatherSubscriptionDocument);

  useEffect(() => {
    if (error) {
      handleError(error)
    }
  }, [error]);

  const deleteSubscription = async (cityName: string): Promise<void> => {
    try {
      const userCitiesWeatherQueryVariables = {
        citiesLimit: Env.MAX_WEATHER_CITIES_AMOUNT,
        forecastDaysAmount: Env.MAX_FORECAST_DAYS,
      };

      await deleteWeatherSubscription({
        variables: {
          city: {
            name: cityName,
          },
        },
        optimisticResponse: {
          deleteWeatherSubscription: {
            __typename: 'Subscription',
            id: 'temp-id',
          },
        },
        update(cache) {
          const cachedQuery = cache.readQuery({
            query: UserCitiesWeatherDocument,
            variables: userCitiesWeatherQueryVariables,
          });

          if (cachedQuery) {
            const data = cachedQuery.userCitiesWeather.filter(
              (forecast) => forecast.city !== cityName,
            );
            cache.writeQuery({
              query: UserCitiesWeatherDocument,
              variables: userCitiesWeatherQueryVariables,
              data: {
                userCitiesWeather: data,
              },
            });
          }
        },
      });

      setError({ message: '' });
    } catch (error) {
      setError({ message: UNEXPECTED_ERROR_MESSAGE });
    }
  };

  return {
    deleteSubscription,
  };
};
