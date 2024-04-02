'use client';

import { useApolloClient, useMutation } from '@apollo/client';
import { Dispatch, SetStateAction, startTransition, useEffect } from 'react';

import { useSubscriptionError, useWeatherCardsList, useWeatherPaginationInfo } from '@/context';
import { env } from '@/core/env';
import { UNEXPECTED_ERROR_MESSAGE } from '@/graphql';

import { useWeatherData } from '../useWeatherData';
import { useWeatherPagination } from '../useWeatherPagination';
import { clearPageCache } from '../utils';

import { AddWeatherSubscriptionDocument } from './mutations';
import { validateCity } from './utils';

type HookReturn = {
  addSubscription: (city: string) => Promise<void>;
  loading: boolean;
};

export const useAddWeatherSubscription = (
  setCity: Dispatch<SetStateAction<string>>,
): HookReturn => {
  const client = useApolloClient();
  const { setError, errorHandler } = useSubscriptionError();
  const { data, refetch } = useWeatherData();
  const { onGoToPage } = useWeatherPagination();
  const { paginationOptions, currentPage, totalPages, totalCount } = useWeatherPaginationInfo();
  const [addWeatherSubscription, { loading, error }] = useMutation(AddWeatherSubscriptionDocument);
  const { setIsAddingCard } = useWeatherCardsList();

  useEffect(() => {
    if (error) {
      errorHandler(error);
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

      const isAddingOnTheNextPage = totalCount % env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT === 0;
      if (currentPage !== totalPages || isAddingOnTheNextPage) {
        clearPageCache(client, {
          ...paginationOptions,
          offset: (totalPages - 1) * paginationOptions.limit,
        });
        await onGoToPage(isAddingOnTheNextPage ? totalPages + 1 : totalPages);
      } else {
        setIsAddingCard(true);
        startTransition(() => {
          refetch().then(() => setIsAddingCard(false));
        });
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
