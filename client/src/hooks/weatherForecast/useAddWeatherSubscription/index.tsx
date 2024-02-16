import { Dispatch, SetStateAction, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { useWeatherData } from '../useWeatherData';
import { UserCitiesWeatherDocument } from '../useWeatherData/queries';
import { Env } from '@/env';
import { AddWeatherSubscriptionDocument } from './mutations';
import { useSubscriptionError } from '@/context';

type UseAddWeatherSubscriptionReturn = {
  addSubscription: (city: string) => Promise<void>;
  loading: boolean;
};

export const useAddWeatherSubscription = (setCity: Dispatch<SetStateAction<string>>): UseAddWeatherSubscriptionReturn => {
  const { setError } = useSubscriptionError()
  const { data, error: weatherRequestError } = useWeatherData();
  const [addWeatherSubscription, { loading, error: addingSubscriptionError }] = useMutation(
    AddWeatherSubscriptionDocument,
    {
      refetchQueries: [UserCitiesWeatherDocument],
    },
  );

  useEffect(() => {
    if (weatherRequestError?.message) {
      setError({ message: weatherRequestError?.message });
    }
  }, [weatherRequestError, addingSubscriptionError, data]);

  const addSubscription = async (city: string): Promise<void> => {
    try {
      setError({ message: '' });

      if (!city) {
        throw new Error('Please enter the city!');
      }

      if (data?.userCitiesWeather.length === Env.MAX_WEATHER_CITIES_AMOUNT) {
        throw new Error(`You cannot have more than ${Env.MAX_WEATHER_CITIES_AMOUNT} cities.`);
      }

      const isCityAlreadyExists = data?.userCitiesWeather.some(
        (forecast) => forecast.city === city,
      );
      if (isCityAlreadyExists) {
        throw new Error(`You already have a subscription to ${city}.`);
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
      if (err instanceof Error) {
        setError({ message: err.message });
      }
    }
  };

  return {
    loading,
    addSubscription,
  };
};
