'use client'

import { FetchResponse } from "@/shared";
import { ApolloError } from "@apollo/client";
import { useEffect } from "react";

type ProcessDataOptions<TData> = {
    jsonResponse: string,
    onSuccess: (data: TData) => void;
    onError: (error: ApolloError) => void;
}

export const useProcessResponse = <TData,>({
    jsonResponse,
    onSuccess,
    onError
}: ProcessDataOptions<TData>): FetchResponse<TData> => {
    const { responseData, error } = JSON.parse(jsonResponse);

    useEffect(() => {
        try {

            if (responseData) {
                const { data, errors } = responseData;

                if (errors?.length) {
                    throw new ApolloError({ graphQLErrors: errors });
                }

                if (data) {
                    onSuccess(data);
                }
            } else if (error) {
                throw error;
            }
        } catch (error) {
            if (error instanceof ApolloError) {
                onError(error);
            }
        }
    }, [jsonResponse])

    return { responseData, error }
};

