import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';

import { errorLink, refreshTokenLink, mainHttpLink } from './links';
import { typePolicies } from './typePolicies';
import { resolvers } from './resolvers';

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
