import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';

import { errorLink, mainHttpLink, refreshTokenLink } from './links';
import { resolvers } from './resolvers';
import { typePolicies } from './typePolicies';

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies,
  }),
  resolvers,
});

export const apolloLinks = ApolloLink.from([
  errorLink.split(
    (operation) => operation.getContext().unauthenticated,
    refreshTokenLink(apolloClient),
  ),
  mainHttpLink,
]);

apolloClient.setLink(apolloLinks);
