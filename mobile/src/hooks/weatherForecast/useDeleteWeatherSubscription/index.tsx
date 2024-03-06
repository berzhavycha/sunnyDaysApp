import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { Env } from '@/env';
import { useSubscriptionError, useWeatherPaginationQueryOptions } from '@/context';
import { UNEXPECTED_ERROR_MESSAGE } from '@/graphql';
import { DeleteWeatherSubscriptionDocument } from './mutations';
import { useWeatherData } from '../useWeatherData';
import { START_PAGE_NUMBER } from '@/context/WeatherPaginationOptions/constants';
import { purgePageCache, readPageCache, writePageCache } from './utils';
import { useWeatherPagination } from '../useWeatherPagination';

type HookReturn = {
  deleteSubscription: (city: string) => Promise<void>;
};

export const useDeleteWeatherSubscription = (): HookReturn => {
  const { setError, handleError } = useSubscriptionError();
  const [deleteWeatherSubscription, { error }] = useMutation(DeleteWeatherSubscriptionDocument);
  const {
    paginationOptions,
    updatePaginationOptions,
    currentPage,
    totalCount,
    setTotalCount,
    setCurrentPage,
  } = useWeatherPaginationQueryOptions();
  const { fetchMore, data } = useWeatherData();
  const { isPageContentCached } = useWeatherPagination()

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
          setTotalCount((prev) => prev - 1);

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

            if (!isPageContentCached({ offset: paginationOptions.offset + paginationOptions.limit - 1 })) {
              await fetchMore({
                variables: { offset: (data?.userCitiesWeather.edges?.length ?? 1) * currentPage },
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

            console.log(totalCount - 1, data?.userCitiesWeather.paginationInfo?.totalCount)
            if (
              (totalCount - 1) % Env.WEATHER_CITIES_LIMIT === 0 &&
              currentPageCache?.userCitiesWeather.edges?.length === 1
            ) {
              updatePaginationOptions({
                offset: paginationOptions.offset - paginationOptions.limit,
              });
              setCurrentPage((prev) => prev - 1 || START_PAGE_NUMBER);
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
