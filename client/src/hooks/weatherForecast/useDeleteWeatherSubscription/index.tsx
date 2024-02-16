import { ApolloError, useMutation } from '@apollo/client';

import { UserCitiesWeatherDocument } from '../useWeatherData/queries';
import { DeleteWeatherSubscriptionDocument } from './mutations';

type UseDeleteWeatherSubscriptionReturn = {
  deleteSubscription: (city: string) => Promise<void>;
  deletionLoading: boolean;
  deletionError?: ApolloError;
};

export const useDeleteWeatherSubscription = (): UseDeleteWeatherSubscriptionReturn => {
  const [deleteWeatherSubscription, { loading: deletionLoading, error: deletionError }] =
    useMutation(DeleteWeatherSubscriptionDocument, {
      refetchQueries: [UserCitiesWeatherDocument]
    });

  const deleteSubscription = async (cityName: string): Promise<void> => {
    await deleteWeatherSubscription({
      variables: {
        city: {
          name: cityName,
        },
      },
    });
  };

  return {
    deleteSubscription,
    deletionLoading,
    deletionError,
  };
};
