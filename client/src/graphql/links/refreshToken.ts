import { Observable, ApolloLink, ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { refreshAccessToken } from '../utils';

export const refreshTokenLink = (apolloClient: ApolloClient<NormalizedCacheObject>): ApolloLink =>
  new ApolloLink((operation, forward) => {
    console.log("We are refreshing")
    return new Observable((observer) => {
      (async (): Promise<void> => {
        try {
          await refreshAccessToken(apolloClient);
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
  });
