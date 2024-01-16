import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GRAPHQL_BASE_URL } from '@env';

export const apolloClient = new ApolloClient({
    uri: GRAPHQL_BASE_URL,
    cache: new InMemoryCache()
});
