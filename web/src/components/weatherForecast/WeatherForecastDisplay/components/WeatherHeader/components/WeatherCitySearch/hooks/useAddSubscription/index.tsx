import { ApolloError } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import { addWeatherSubscription, UserCitiesWeatherQuery } from '@/services';
import { getApolloErrorMessage } from '@/shared';

type HookReturn = {
  error: string;
  addSubscriptionAction: (payload: FormData) => void;
};

export const useAddSubscription = (weatherData?: UserCitiesWeatherQuery): HookReturn => {
  const [error, setError] = useState<string>('');

  const addWeatherSubscriptionWithParams = addWeatherSubscription.bind(null, weatherData);
  const [addSubscriptionState, addSubscriptionAction] = useFormState(
    addWeatherSubscriptionWithParams,
    {
      error: '',
    },
  );

  useEffect(() => {
    try {
      setError('')
      
      if (addSubscriptionState.error.startsWith('{') && addSubscriptionState.error.endsWith('}')) {
        const apolloError = JSON.parse(addSubscriptionState.error);

        throw new ApolloError({ graphQLErrors: apolloError.graphQLErrors });
      }

      setError(addSubscriptionState.error);
    } catch (error) {
      if (error instanceof ApolloError) {
        setError(getApolloErrorMessage(error));
      }
    }
  }, [addSubscriptionState]);

  return {
    error,
    addSubscriptionAction,
  };
};
