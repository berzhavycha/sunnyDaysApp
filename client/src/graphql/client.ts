import { ApolloClient, InMemoryCache } from '@apollo/client';

import { apolloLinks } from './links';

export const apolloClient = new ApolloClient({
  link: apolloLinks,
  cache: new InMemoryCache(),
});
