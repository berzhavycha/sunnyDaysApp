import { Dispatch, SetStateAction, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { useSubscriptionError } from '@/context';
import { Env } from '@/env';
import { UNEXPECTED_ERROR_MESSAGE } from '@/graphql';
import { useWeatherData } from '../useWeatherData';
import { UserCitiesWeatherDocument } from '../useWeatherData/queries';
import { AddWeatherSubscriptionDocument } from './mutations';

type HookReturn = {
  addSubscription: (city: string) => Promise<void>;
  loading: boolean;
};

export const useAddWeatherSubscription = (
  setCity: Dispatch<SetStateAction<string>>,
): HookReturn => {
  const { setError } = useSubscriptionError();
  const { data } = useWeatherData();
  const [addWeatherSubscription, { loading, error }] = useMutation(AddWeatherSubscriptionDocument, {
    refetchQueries: [UserCitiesWeatherDocument],
  });

  useEffect(() => {
    if (error) {
      if (error.graphQLErrors[0]?.extensions.originalError) {
        setError({ message: error.graphQLErrors[0].extensions.originalError.message });
      } else {
        setError({ message: UNEXPECTED_ERROR_MESSAGE });
      }
    }
  }, [data, loading, error]);

  const addSubscription = async (city: string): Promise<void> => {
    try {
      setError({ message: '' });

      if (!city) {
        return setError({ message: 'Please enter the city!' });
      }

      if (data?.userCitiesWeather.length === Env.MAX_WEATHER_CITIES_AMOUNT) {
        return setError({
          message: `You cannot have more than ${Env.MAX_WEATHER_CITIES_AMOUNT} cities.`,
        });
      }

      const isCityAlreadyExists = data?.userCitiesWeather.some(
        (forecast) => forecast.city === city,
      );
      if (isCityAlreadyExists) {
        return setError({ message: `You already have a subscription to ${city}.` });
      }

      await addWeatherSubscription({
        variables: {
          city: {
            name: city,
          },
        },
      });

      setCity('');
    } catch (err) {
      setError({ message: UNEXPECTED_ERROR_MESSAGE });
    }
  };

  return {
    loading,
    addSubscription,
  };
};
