import { Observable } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

export const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions.code === 'UNAUTHENTICATED') {
        if (operation.operationName === 'RefreshAccess' || operation.operationName === 'SignIn') {
          return;
        }

        return new Observable((observer) => {
          (async (): Promise<void> => {
            try {
              operation.setContext({ unauthenticated: true });

              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              };
              
              forward(operation).subscribe(subscriber);
            } catch (err) {
              observer.error(err);
            }
          })();
        });
      }
    }
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
