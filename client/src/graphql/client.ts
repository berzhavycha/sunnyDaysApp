import { ApolloClient, ApolloLink, InMemoryCache, split } from '@apollo/client';

import { REACT_APP_GEODB_CLIENT_NAME } from '@env';
import { geodbHttpLink, errorLink, mainHttpLink, refreshTokenLink } from './links';

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
});

export const apolloLinks = ApolloLink.from([
  errorLink,
  refreshTokenLink(apolloClient),
  split(
    (operation) => operation.getContext().clientName === REACT_APP_GEODB_CLIENT_NAME,
    geodbHttpLink,
    mainHttpLink,
  ),
]);

apolloClient.setLink(apolloLinks);
