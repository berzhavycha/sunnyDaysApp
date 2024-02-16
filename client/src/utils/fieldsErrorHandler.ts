import { ApolloError } from '@apollo/client';

import { FieldErrorsState } from '@/hooks';

export const fieldsErrorHandler = <T>(
  errors: ApolloError,
  pickErrorsCallback: (messages: string[]) => FieldErrorsState<T>,
): FieldErrorsState<T> | null => {
  let fieldsError: FieldErrorsState<T> | null = null;

  errors.graphQLErrors.forEach((graphQLError) => {
    console.log(graphQLError)
    if (
      graphQLError.extensions?.code === 'BAD_REQUEST' &&
      graphQLError.extensions?.originalError?.message
    ) {
      const inputErrorMessages = graphQLError.extensions.originalError.message as string[];
      fieldsError = pickErrorsCallback(inputErrorMessages);
    } else if (
      graphQLError.extensions?.code === 'INTERNAL_SERVER_ERROR' ||
      graphQLError.extensions?.code === 'UNAUTHENTICATED' ||
      (graphQLError.extensions?.code === 'BAD_USER_INPUT' && graphQLError.message)
    ) {
      const inputErrorMessage = graphQLError.message;
      fieldsError = pickErrorsCallback([inputErrorMessage]);
    } 
  });

  return fieldsError;
};
