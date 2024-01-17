import { ApolloClient, ApolloError } from "@apollo/client";
import { FieldErrors } from "../sign-up";

export const fieldsErrorHandler = (errors: ApolloError): FieldErrors => {
    const fieldErrors = {
        email: '',
        password: ''
    };

    errors.graphQLErrors.forEach((graphQLError) => {
        if (
            graphQLError.extensions?.code === 'BAD_REQUEST' &&
            graphQLError.extensions?.originalError?.message
        ) {
            const inputErrorMessages = graphQLError.extensions.originalError.message as string[];

            inputErrorMessages.forEach((error) => {
                console.log(error)
                if (error.includes('email') && !fieldErrors.email) {
                    fieldErrors.email = error;
                } else if (error.includes('password') && !fieldErrors.password) {
                    fieldErrors.password = error;
                }
            });
        }
    });

    return fieldErrors as FieldErrors
}