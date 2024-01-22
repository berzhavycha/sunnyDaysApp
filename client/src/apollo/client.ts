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
import { setContext } from '@apollo/client/link/context';
import { getProperToken, refreshAccessToken } from './utils';
import { GraphQLError } from 'graphql';

const mainHttpLink = new HttpLink({
  uri: "https://44ad-45-12-25-249.ngrok-free.app/api/graphql",
});

const authLink = setContext(async (operation, { headers }) => {
  const token = await getProperToken(operation);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const citiesHttpLink = new HttpLink({
  uri: "https://geodb-cities-graphql.p.rapidapi.com/",
  headers: {
    'x-rapidapi-key': '193726f521msh8d092bde3ff5c7bp128865jsn51660578c98a',
    'x-rapidapi-host': 'geodb-cities-graphql.p.rapidapi.com',
    'Content-Type': 'application/json'
  }
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions.code === 'UNAUTHENTICATED') {
        if (operation.operationName === 'RefreshAccess') return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const observable = new Observable<FetchResult<Record<string, any>>>((observer) => {
          (async () => {
            try {
              const accessToken = await refreshAccessToken(apolloClient);

              if (!accessToken) {
                throw new GraphQLError('Empty AccessToken');
              }

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
    authLink,
    split(
      operation => operation.getContext().clientName === "cities-endpoint",
      citiesHttpLink,
      mainHttpLink
    )
  ]),
  cache: new InMemoryCache(),
});
