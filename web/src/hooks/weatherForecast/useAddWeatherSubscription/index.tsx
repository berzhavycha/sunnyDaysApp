'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';

import { useSubscriptionError, useWeatherPaginationQueryOptions } from '@/context';
import { UNEXPECTED_ERROR_MESSAGE } from '@/graphql';
import { useWeatherData } from '../useWeatherData';
import { AddWeatherSubscriptionDocument } from './mutations';
import { validateCity } from './utils';
import { useWeatherPagination } from '..';
import { clearPageCache } from '../utils';

type HookReturn = {
  addSubscription: (city: string) => Promise<void>;
  loading: boolean;
};

export const useAddWeatherSubscription = (
  setCity: Dispatch<SetStateAction<string>>,
): HookReturn => {
  const client = useApolloClient();
  const { setError, handleError } = useSubscriptionError();
  const { data, refetch } = useWeatherData();
  const { onGoToPage } = useWeatherPagination();
  const { paginationOptions, currentPage, totalPages } = useWeatherPaginationQueryOptions();
  const [addWeatherSubscription, { loading, error }] = useMutation(AddWeatherSubscriptionDocument);

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

      if (currentPage !== totalPages) {
        clearPageCache(client, {
          ...paginationOptions,
          offset: (totalPages - 1) * paginationOptions.limit,
        });
        await onGoToPage(totalPages);
      } else {
        refetch();
      }

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
