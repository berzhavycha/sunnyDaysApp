import { onError } from '@apollo/client/link/error';
// import { REACT_APP_GRAPHQL_BASE_URL } from "@env";
import {
  ApolloClient,
  FetchResult,
  HttpLink,
  InMemoryCache,
  Observable,
  ApolloLink,
  split,
} from '@apollo/client';
import { refreshAccessToken } from './utils';
import { REACT_APP_GEODB_CITIES_API_KEY, REACT_APP_GEODB_CITIES_HOST, REACT_APP_GEODB_CITIES_URL, REACT_APP_GEODB_CLIENT_NAME } from '@env';

const mainHttpLink = new HttpLink({
  uri: "https://18c4-194-44-70-13.ngrok-free.app/api/graphql",
  credentials: 'include'
});

const citiesHttpLink = new HttpLink({
  uri: REACT_APP_GEODB_CITIES_URL,
  headers: {
    'x-rapidapi-key': REACT_APP_GEODB_CITIES_API_KEY,
    'x-rapidapi-host': REACT_APP_GEODB_CITIES_HOST,
    'Content-Type': 'application/json'
  }
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions.code === 'UNAUTHENTICATED') {
        console.log(operation.operationName)
        if (operation.operationName === 'RefreshAccess') return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const observable = new Observable<FetchResult<Record<string, any>>>((observer) => {
          (async () => {
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

        return observable;
      }
    }
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    split(
      operation => operation.getContext().clientName === REACT_APP_GEODB_CLIENT_NAME,
      citiesHttpLink,
      mainHttpLink
    )
  ]),
  cache: new InMemoryCache(),
});