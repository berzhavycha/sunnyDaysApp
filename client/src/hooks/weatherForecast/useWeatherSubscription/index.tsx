import { ApolloError, useMutation } from '@apollo/client';
import { GET_USER_CITIES_WEATHER } from '@/components/weatherForecast/WeatherCardsList/hooks/useWeatherData/queries';
import { ADD_WEATHER_SUBSCRIPTION, DELETE_WEATHER_SUBSCRIPTION } from './mutations';

type UseWeatherSubscriptionReturn = {
  deleteSubscriptionHandler: (city: string) => Promise<void>;
  additionLoading: boolean;
  additionError?: ApolloError | undefined;
  addSubscriptionHandler: (city: string) => Promise<void>;
  deletionLoading: boolean;
  deletionError?: ApolloError | undefined;
};

export const useWeatherSubscription = (): UseWeatherSubscriptionReturn => {
  const refetchQueries = [GET_USER_CITIES_WEATHER];

  const [addWeatherSubscription, { loading: additionLoading, error: additionError }] = useMutation(
    ADD_WEATHER_SUBSCRIPTION, {
    refetchQueries,
  },);

  const [deleteWeatherSubscription, { loading: deletionLoading, error: deletionError }] =
    useMutation(DELETE_WEATHER_SUBSCRIPTION, {
      refetchQueries,
    });

  const deleteSubscriptionHandler = async (city: string): Promise<void> => {
    await deleteWeatherSubscription({
      variables: {
        city,
      },
    });
  };

  const addSubscriptionHandler = async (city: string): Promise<void> => {
    await addWeatherSubscription({
      variables: {
        city,
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
