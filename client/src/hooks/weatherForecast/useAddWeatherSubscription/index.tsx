import { Dispatch, SetStateAction, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { useSubscriptionError } from '@/context';
import { Env } from '@/env';
import { useWeatherData } from '../useWeatherData';
import { UserCitiesWeatherDocument } from '../useWeatherData/queries';
import { AddWeatherSubscriptionDocument } from './mutations';

type UseAddWeatherSubscriptionReturn = {
  addSubscription: (city: string) => Promise<void>;
  loading: boolean;
};

export const useAddWeatherSubscription = (setCity: Dispatch<SetStateAction<string>>): UseAddWeatherSubscriptionReturn => {
  const { setError } = useSubscriptionError()
  const { data, error: weatherRequestError } = useWeatherData();
  const [addWeatherSubscription, { loading, error: additionSubscriptionError }] = useMutation(
    AddWeatherSubscriptionDocument,
    {
      refetchQueries: [UserCitiesWeatherDocument],
    },
  );

  useEffect(() => {
    if (weatherRequestError?.graphQLErrors[0].extensions.code === 'BAD_REQUEST') {
      setError({ message: weatherRequestError?.message });
    } else if (weatherRequestError || additionSubscriptionError) {
      setError({ message: 'Oops...Something went wrong!' })
    }
  }, [weatherRequestError, additionSubscriptionError]);

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
