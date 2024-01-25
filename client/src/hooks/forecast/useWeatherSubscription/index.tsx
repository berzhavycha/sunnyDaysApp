import { ApolloError, useMutation } from '@apollo/client';
import {
    ADD_WEATHER_SUBSCRIPTION,
    DELETE_WEATHER_SUBSCRIPTION,
    GET_USER_CITIES_WEATHER,
} from '@/apollo';

type UseWeatherSubscriptionReturnType = {
    deleteSubscriptionHandler: (city: string) => Promise<void>
    additionLoading: boolean;
    additionError?: ApolloError | undefined;
    addSubscriptionHandler: (city: string) => Promise<void>
    deletionLoading: boolean;
    deletionError?: ApolloError | undefined;
};

export const useWeatherSubscription = (): UseWeatherSubscriptionReturnType => {
    const [addWeatherSubscription, { loading: additionLoading, error: additionError }] = useMutation(
        ADD_WEATHER_SUBSCRIPTION,
        {
            refetchQueries: [GET_USER_CITIES_WEATHER]
        })

    const [deleteWeatherSubscription, { loading: deletionLoading, error: deletionError }] = useMutation(
        DELETE_WEATHER_SUBSCRIPTION,
        {
            refetchQueries: [GET_USER_CITIES_WEATHER],
        }
    );

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
