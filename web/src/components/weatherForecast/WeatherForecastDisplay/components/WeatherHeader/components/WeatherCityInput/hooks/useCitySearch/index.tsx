import { useSubscriptionError, useWeatherCardsList } from "@/context";
import { useQueryParams, DEBOUNCE_DELAY } from "@/hooks";
import { addWeatherSubscription } from "@/services";
import { ApolloError } from "@apollo/client";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useDebouncedCallback } from "use-debounce";

type HookReturn = {
    queryParamsHandler: (text: string) => void,
    addSubscriptionAction: (payload: FormData) => void
    addSubscriptionState: { error: string }
}

export const useCitySearch = (): HookReturn => {
    const { weatherData } = useWeatherCardsList();
    const { setError, errorHandler } = useSubscriptionError();
    const addWeatherSubscriptionWithParams = addWeatherSubscription.bind(null, weatherData);
    const [addSubscriptionState, addSubscriptionAction] = useFormState(
        addWeatherSubscriptionWithParams,
        {
            error: '',
        },
    );

    const { updateQueryParams, deleteQueryParam } = useQueryParams();

    useEffect(() => {
        try {
            if (addSubscriptionState.error.startsWith('{') && addSubscriptionState.error.endsWith('}')) {
                const apolloError = JSON.parse(addSubscriptionState.error);

                throw new ApolloError({ graphQLErrors: apolloError.graphQLErrors });
            }

            setError({ message: addSubscriptionState.error });
        } catch (error) {
            if (error instanceof ApolloError) {
                errorHandler(error);
            }
        }
    }, [addSubscriptionState]);


    const queryParamsHandler = useDebouncedCallback((text: string): void => {
        if (text) {
            updateQueryParams({ citySearch: text });
        } else {
            deleteQueryParam('citySearch');
        }
    }, DEBOUNCE_DELAY);

    return {
        queryParamsHandler,
        addSubscriptionAction,
        addSubscriptionState
    }
}