import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

const httpLink = new HttpLink({
  uri: "https://21d4-194-44-70-13.ngrok-free.app/api/graphql",
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
