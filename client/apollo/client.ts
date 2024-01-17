import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { GRAPHQL_BASE_URL } from '@env';

const httpLink = new HttpLink({ uri: 'https://0bca-45-12-25-249.ngrok-free.app/api/graphql' });

const authLink = new ApolloLink((operation, forward) => {
    const token = null;

    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : ''
        }
    });

    return forward(operation);
});

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});
