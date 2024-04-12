import { ApolloClient, ApolloLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

import { forwardCookieServerLink, mainHttpLink } from '../links';

export const createClient = (): ApolloClient<NormalizedCacheObject> => {
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        errorPolicy: 'all',
      },
    },
  });

  const apolloLinks = ApolloLink.from([forwardCookieServerLink, mainHttpLink]);

  apolloClient.setLink(apolloLinks);

  return apolloClient;
};
