import { UNEXPECTED_ERROR_MESSAGE } from "@/graphql";
import { OriginalError } from "@/shared/types";
import { ApolloError } from "@apollo/client";

export const getApolloErrorMessage = (error: ApolloError | Error): string => {
    if (error instanceof ApolloError && error.graphQLErrors[0]?.extensions.originalError) {
        // Use type assertion to access the 'message' property.
        // TypeScript infers the type of 'extensions' keys as 'unknown',
        // so we need to assert the type to access specific properties.
        return (
            error.graphQLErrors[0].extensions.originalError as OriginalError
        ).message;
    } else {
        return UNEXPECTED_ERROR_MESSAGE
    }
};