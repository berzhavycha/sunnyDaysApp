import { Dispatch, SetStateAction, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { useSubscriptionError } from '@/context';
import { UNEXPECTED_ERROR_MESSAGE } from '@/graphql';
import { useWeatherData } from '../useWeatherData';
import { UserCitiesWeatherDocument } from '../useWeatherData/queries';
import { AddWeatherSubscriptionDocument } from './mutations';
import { validateCity } from './utils';

type HookReturn = {
  addSubscription: (city: string) => Promise<void>;
  loading: boolean;
};

export const useAddWeatherSubscription = (
  setCity: Dispatch<SetStateAction<string>>,
): HookReturn => {
  const { setError, handleError } = useSubscriptionError();
  const { data } = useWeatherData();
  const [addWeatherSubscription, { loading, error }] = useMutation(AddWeatherSubscriptionDocument, {
    refetchQueries: [UserCitiesWeatherDocument],
  });

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [data, loading, error]);

  const addSubscription = async (city: string): Promise<void> => {
    try {
      setError({ message: '' });

      const errorMessage = validateCity(city, data);

      if (errorMessage) {
        return setError({ message: errorMessage });
      }

      await addWeatherSubscription({
        variables: {
          city: {
            name: city,
          },
        },
      });

      console.log("ADD CITY")
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
