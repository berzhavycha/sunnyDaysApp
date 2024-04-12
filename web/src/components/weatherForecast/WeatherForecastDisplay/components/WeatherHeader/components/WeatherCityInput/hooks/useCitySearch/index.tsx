import { ApolloError } from '@apollo/client';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { useSubscriptionError, useWeatherCardsList } from '@/context';
import { addWeatherSubscription } from '@/services';

type HookReturn = {
  addSubscriptionAction: (payload: FormData) => void;
};

export const useCitySearch = (): HookReturn => {
  const { weatherData } = useWeatherCardsList();
  const { setError, errorHandler } = useSubscriptionError();

  const addWeatherSubscriptionWithParams = addWeatherSubscription.bind(null, weatherData);
  const [addSubscriptionState, addSubscriptionAction] = useFormState(
    addWeatherSubscriptionWithParams,
    {
      error: '',
    },
  );

  useEffect(() => {
    try {
      if (addSubscriptionState.error.startsWith('{') && addSubscriptionState.error.endsWith('}')) {
        const apolloError = JSON.parse(addSubscriptionState.error);

        throw new ApolloError({ graphQLErrors: apolloError.graphQLErrors });
      }

      setError({ message: addSubscriptionState.error });
    } catch (error) {
      if (error instanceof ApolloError) {
        errorHandler(error);
      }
    }
  }, [addSubscriptionState]);

  return {
    addSubscriptionAction,
  };
};
