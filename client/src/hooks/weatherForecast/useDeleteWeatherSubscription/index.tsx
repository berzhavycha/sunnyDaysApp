import { useMutation } from '@apollo/client';
import { useEffect } from 'react';

import { UserCitiesWeatherDocument } from '../useWeatherData/queries';
import { DeleteWeatherSubscriptionDocument } from './mutations';
import { Env } from '@/env';
import { useSubscriptionError } from '@/context';
import { ExtensionsErrorCode } from '@/graphql';

type HookReturn = {
  deleteSubscription: (city: string) => Promise<void>;
};

export const useDeleteWeatherSubscription = (): HookReturn => {
  const { setError } = useSubscriptionError()
  const [deleteWeatherSubscription, { error }] =
    useMutation(DeleteWeatherSubscriptionDocument);

  useEffect(() => {
    if (error) {
      const { code, message } = error?.graphQLErrors[0].extensions

      if (code === ExtensionsErrorCode.BAD_REQUEST) {
        setError({ message });
      } else if (error) {
        setError({ message: 'Oops...Something went wrong!' });
      }
    }
  }, [error]);

  const deleteSubscription = async (cityName: string): Promise<void> => {
    try {
      await deleteWeatherSubscription({
        variables: {
          city: {
            name: cityName,
          },
        },
        optimisticResponse: {
          deleteWeatherSubscription: {
            __typename: 'Subscription',
            id: 'temp-id'
          }
        },
        update(cache) {
          const cachedQuery = cache.readQuery({
            query: UserCitiesWeatherDocument,
            variables: {
              citiesLimit: Env.MAX_WEATHER_CITIES_AMOUNT,
              forecastDaysAmount: Env.MAX_FORECAST_DAYS,
            },
          })

          if (cachedQuery) {
            const data = cachedQuery.userCitiesWeather.filter(forecast => forecast.city !== cityName)
            cache.writeQuery({
              query: UserCitiesWeatherDocument,
              variables: {
                citiesLimit: Env.MAX_WEATHER_CITIES_AMOUNT,
                forecastDaysAmount: Env.MAX_FORECAST_DAYS,
              },
              data: {
                userCitiesWeather: data
              }
            })
          }
        }
      });

      setError({ message: '' })
    } catch (error) {
      setError({ message: 'Oops...Something went wrong!' });
    }
  };

  return {
    deleteSubscription,
  };
};
