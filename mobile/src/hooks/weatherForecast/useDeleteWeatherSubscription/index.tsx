import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { Env } from '@/env';
import { useSubscriptionError, useWeatherPaginationInfo } from '@/context';
import { UNEXPECTED_ERROR_MESSAGE } from '@/graphql';
import { DeleteWeatherSubscriptionDocument } from './mutations';
import { useWeatherData } from '../useWeatherData';
import { purgePageCache, readPageCache, writePageCache } from '../utils';
import { useWeatherPagination } from '../useWeatherPagination';
import { Direction } from '@/shared/types';

type HookReturn = {
  deleteSubscription: (city: string) => Promise<void>;
};

export const useDeleteWeatherSubscription = (): HookReturn => {
  const { setError, handleError } = useSubscriptionError();
  const [deleteWeatherSubscription, { error }] = useMutation(DeleteWeatherSubscriptionDocument);
  const { paginationOptions, currentPage, totalCount, totalPages } = useWeatherPaginationInfo();
  const { fetchMore } = useWeatherData();
  const { isPageContentCached, onClickPrev } = useWeatherPagination();

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  const deleteSubscription = async (cityName: string): Promise<void> => {
    try {
      await deleteWeatherSubscription({
        variables: {
          city: {
            name: cityName,
          },
        },
        optimisticResponse: {
          deleteWeatherSubscription: {
            __typename: 'Subscription',
            id: 'temp-id',
          },
        },
        async update(cache) {
          const currentPageCache = readPageCache(cache, paginationOptions);

          if (currentPageCache) {
            const clearedCurrentPage = purgePageCache(
              currentPageCache.userCitiesWeather.edges,
              cityName,
            );

            writePageCache(cache, paginationOptions, {
              ...currentPageCache.userCitiesWeather,
              edges: clearedCurrentPage ?? [],
            });

            if (
              !isPageContentCached(
                {
                  offset: paginationOptions.offset + paginationOptions.limit - 1,
                },
                Direction.FORWARD,
              ) &&
              currentPage !== totalPages
            ) {
              await fetchMore({
                variables: { offset: paginationOptions.limit * currentPage },
              });

              const newCurrentPageCache = readPageCache(cache, paginationOptions);
              if (newCurrentPageCache) {
                const newClearedData = purgePageCache(
                  newCurrentPageCache.userCitiesWeather.edges,
                  cityName,
                );

                writePageCache(cache, paginationOptions, {
                  ...newCurrentPageCache.userCitiesWeather,
                  edges: newClearedData ?? [],
                });
              }
            }

            if (
              (totalCount - 1) % Env.WEATHER_CITIES_LIMIT === 0 &&
              currentPageCache?.userCitiesWeather.edges?.length === 1
            ) {
              await onClickPrev();
            }
          }
        },
      });

      setError({ message: '' });
    } catch (error) {
      setError({ message: UNEXPECTED_ERROR_MESSAGE });
    }
  };

  return {
    deleteSubscription,
  };
};
