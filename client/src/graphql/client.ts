import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';

import { errorLink, refreshTokenLink, baseLink } from './links';

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
});

export const apolloLinks = ApolloLink.from([
  errorLink.split(
    (operation) => operation.getContext().unauthenticated,
    refreshTokenLink(apolloClient),
  ),
  baseLink,
]);

apolloClient.setLink(apolloLinks);
