import { REACT_APP_GRAPHQL_BASE_URL } from "@env";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

const httpLink = new HttpLink({
  uri: REACT_APP_GRAPHQL_BASE_URL,
});

const authLink = setContext(async (_, { headers }) => {
  const tokens = await SecureStore.getItemAsync("tokens");

  if (tokens) {
    const { accessToken } = JSON.parse(tokens);

    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  }
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
