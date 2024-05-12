import { ApolloError } from '@apollo/client';

import { FieldErrorsState } from '@/shared/types';

export const fieldsErrorHandler = <T>(
  errors: ApolloError,
  pickErrorsCallback: (messages: string[]) => FieldErrorsState<T>,
): FieldErrorsState<T> | null => {
  let fieldsError: FieldErrorsState<T> | null = null;

  if (errors.graphQLErrors.length) {
    errors.graphQLErrors.forEach((graphQLError) => {
      if (graphQLError.extensions?.code === 'BAD_REQUEST' && graphQLError.originalError?.message) {
        const inputErrorMessages = graphQLError.originalError.message;
        fieldsError = pickErrorsCallback([inputErrorMessages]);
      } else if (
        graphQLError.extensions?.code === 'INTERNAL_SERVER_ERROR' ||
        graphQLError.extensions?.code === 'UNAUTHENTICATED' ||
        (graphQLError.extensions?.code === 'BAD_USER_INPUT' && graphQLError.message)
      ) {
        const inputErrorMessage = graphQLError.message;
        fieldsError = pickErrorsCallback([inputErrorMessage]);
      }
    });
  } else {
    fieldsError = pickErrorsCallback([errors.message]);
  }

  return fieldsError;
};
