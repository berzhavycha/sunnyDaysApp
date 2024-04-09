import { ApolloError } from '@apollo/client';
import { useDebouncedCallback } from 'use-debounce';

import { DEBOUNCE_DELAY } from '@/components/weatherForecast/constants';
import { useSubscriptionError, useWeatherCardsList } from '@/context';
import { useQueryParams } from '@/hooks';
import { addWeatherSubscription } from '@/services';

type HookReturn = {
  queryParamsHandler: (text: string) => void;
  addSubscriptionAction: (payload: FormData) => Promise<void>;
};

export const useCitySearch = (): HookReturn => {
  const { weatherData } = useWeatherCardsList();
  const { errorHandler } = useSubscriptionError();
  const addWeatherSubscriptionWithParams = addWeatherSubscription.bind(null, weatherData);

  const { updateQueryParams, deleteQueryParam } = useQueryParams();

  const addSubscriptionAction = async (formData: FormData): Promise<void> => {
    try {
      await addWeatherSubscriptionWithParams(formData)
    } catch (error) {
      if (error instanceof ApolloError) {
        errorHandler(error)
      }
    }
  }


  const queryParamsHandler = useDebouncedCallback((text: string): void => {
    if (text) {
      updateQueryParams({ citySearch: text });
    } else {
      deleteQueryParam('citySearch');
    }
  }, DEBOUNCE_DELAY);

  return {
    queryParamsHandler,
    addSubscriptionAction
  };
};
