import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { Env } from '@/env';
import { useSubscriptionError, useWeatherPaginationQueryOptions } from '@/context';
import { UNEXPECTED_ERROR_MESSAGE } from '@/graphql';
import { UserCitiesWeatherDocument } from '../useWeatherData/queries';
import { DeleteWeatherSubscriptionDocument } from './mutations';
import { useWeatherData } from '../useWeatherData';

type HookReturn = {
  deleteSubscription: (city: string) => Promise<void>;
};

export const useDeleteWeatherSubscription = (): HookReturn => {
  const { setError, handleError } = useSubscriptionError();
  const [deleteWeatherSubscription, { error }] = useMutation(DeleteWeatherSubscriptionDocument);
  const { paginationOptions, currentPage } = useWeatherPaginationQueryOptions();
  const { fetchMore, data } = useWeatherData();

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  const deleteSubscription = async (cityName: string): Promise<void> => {
    try {
      const userCitiesWeatherQueryVariables = {
        ...paginationOptions,
        forecastDaysAmount: Env.MAX_FORECAST_DAYS,
      };

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
          const cachedQuery = cache.readQuery({
            query: UserCitiesWeatherDocument,
            variables: userCitiesWeatherQueryVariables,
          });

          if (cachedQuery) {
            const nextCachedPage = cache.readQuery({
              query: UserCitiesWeatherDocument,
              variables: {
                ...userCitiesWeatherQueryVariables,
                offset:
                  userCitiesWeatherQueryVariables.offset + userCitiesWeatherQueryVariables.limit,
              },
            });

            if (!nextCachedPage?.userCitiesWeather.edges?.length) {
              await fetchMore({
                variables: { offset: (data?.userCitiesWeather.edges?.length ?? 1) * currentPage },
              });
            }

            const clearedData = cachedQuery.userCitiesWeather.edges?.map((edge) => {
              if (edge.city === cityName) {
                return {
                  ...edge,
                  _deleted: true,
                };
              }

              return edge;
            });

            cache.writeQuery({
              query: UserCitiesWeatherDocument,
              variables: userCitiesWeatherQueryVariables,
              data: {
                userCitiesWeather: {
                  ...cachedQuery.userCitiesWeather,
                  edges: clearedData ?? [],
                },
              },
            });
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
