import { onError } from '@apollo/client/link/error';

export const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions.code === 'UNAUTHENTICATED') {
        if (operation.operationName === 'RefreshAccess' || operation.operationName === 'SignIn') {
          return;
        }
        operation.setContext({ unauthenticated: true });
        return forward(operation);
      }
    }
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
