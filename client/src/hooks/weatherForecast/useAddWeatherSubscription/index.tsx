import { Dispatch, SetStateAction, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { useSubscriptionError } from '@/context';
import { Env } from '@/env';
import { useWeatherData } from '../useWeatherData';
import { UserCitiesWeatherDocument } from '../useWeatherData/queries';
import { AddWeatherSubscriptionDocument } from './mutations';
import { ExtensionsErrorCode } from '@/graphql';

type HookReturn = {
  addSubscription: (city: string) => Promise<void>;
  loading: boolean;
};

export const useAddWeatherSubscription = (
  setCity: Dispatch<SetStateAction<string>>,
): HookReturn => {
  const { setError } = useSubscriptionError();
  const { data } = useWeatherData();
  const [addWeatherSubscription, { loading, error }] = useMutation(
    AddWeatherSubscriptionDocument,
    {
      refetchQueries: [UserCitiesWeatherDocument],
    },
  );

  useEffect(() => {
    if (error) {
      const { code, message } = error?.graphQLErrors[0].extensions

      if (code === ExtensionsErrorCode.BAD_REQUEST) {
        setError({ message });
      } else if (error) {
        setError({ message: 'Oops...Something went wrong!' });
      }
    }
  }, [data, loading, error]);


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
      setError({ message: 'Oops...Something went wrong!' });
    }
  };

  return {
    loading,
    addSubscription,
  };
};
