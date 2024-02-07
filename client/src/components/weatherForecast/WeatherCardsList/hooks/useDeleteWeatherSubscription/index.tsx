import { ApolloError, useMutation } from '@apollo/client';
import { UserCitiesWeatherDocument } from '@/components/weatherForecast/WeatherCardsList/hooks/useWeatherData/queries';
import { DeleteWeatherSubscriptionDocument } from './mutations';

type UseWeatherSubscriptionReturn = {
  deleteSubscriptionHandler: (city: string) => Promise<void>;
  deletionLoading: boolean;
  deletionError?: ApolloError | undefined;
};

export const useDeleteWeatherSubscription = (): UseWeatherSubscriptionReturn => {
  const refetchQueries = [UserCitiesWeatherDocument];

  const [deleteWeatherSubscription, { loading: deletionLoading, error: deletionError }] =
    useMutation(DeleteWeatherSubscriptionDocument, {
      refetchQueries,
    });

  const deleteSubscriptionHandler = async (cityName: string): Promise<void> => {
    await deleteWeatherSubscription({
      variables: {
        city: {
          name: cityName,
        },
      },
    });
  };

  return {
    deleteSubscriptionHandler,
    deletionLoading,
    deletionError,
  };
};
