import { onError } from "@apollo/client/link/error";
// import { REACT_APP_GRAPHQL_BASE_URL } from "@env";
import { ApolloClient, FetchResult, HttpLink, InMemoryCache, Observable, ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getProperToken } from "./utils/getProperToken";
import { refreshAccessToken } from "./utils/refreshAccessToken";
import { GraphQLError } from "graphql";

const httpLink = new HttpLink({
  uri: "https://8ec6-194-44-70-13.ngrok-free.app/api/graphql",
});

const authLink = setContext(async (operation, { headers }) => {
  const token = await getProperToken(operation);

  console.log(operation.operationName)

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions.code === "UNAUTHENTICATED") {
        if (operation.operationName === "RefreshAccess") return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const observable = new Observable<FetchResult<Record<string, any>>>((observer) => {
          (async () => {
            try {
              const accessToken = await refreshAccessToken(apolloClient);

              if (!accessToken) {
                throw new GraphQLError("Empty AccessToken");
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
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
