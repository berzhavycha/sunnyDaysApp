import { ApolloError, useMutation } from '@apollo/client';
import { UserCitiesWeatherDocument } from '@/components/weatherForecast/WeatherCardsList/hooks/useWeatherData/queries';
import { AddWeatherSubscriptionDocument, DeleteWeatherSubscriptionDocument } from './mutations';

type UseWeatherSubscriptionReturn = {
  deleteSubscriptionHandler: (city: string) => Promise<void>;
  additionLoading: boolean;
  additionError?: ApolloError | undefined;
  addSubscriptionHandler: (city: string) => Promise<void>;
  deletionLoading: boolean;
  deletionError?: ApolloError | undefined;
};

export const useWeatherSubscription = (): UseWeatherSubscriptionReturn => {
  const refetchQueries = [UserCitiesWeatherDocument];

  const [addWeatherSubscription, { loading: additionLoading, error: additionError }] = useMutation(
    AddWeatherSubscriptionDocument,
    {
      refetchQueries,
    },
  );

  console.log(additionError);

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

  const addSubscriptionHandler = async (cityName: string): Promise<void> => {
    await addWeatherSubscription({
      variables: {
        city: {
          name: cityName,
        },
      },
    });
  };

  return {
    addSubscriptionHandler,
    additionLoading,
    additionError,
    deleteSubscriptionHandler,
    deletionLoading,
    deletionError,
  };
};
