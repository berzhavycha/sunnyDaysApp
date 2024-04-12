import { ApolloLink, NormalizedCacheObject } from '@apollo/client';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

import { IS_CLIENT } from '@/shared';

import { errorLink, forwardCookieLink, mainHttpLink, refreshTokenLink } from '../../links';

type UseMakeClientReturn = {
  makeClient: () => NextSSRApolloClient<NormalizedCacheObject>;
};

export const useMakeClient = (): UseMakeClientReturn => {
  const makeClient = (): NextSSRApolloClient<NormalizedCacheObject> => {
    const client = new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
    });

    const apolloLinks = ApolloLink.from([
      errorLink.split(
        (operation) => operation.getContext().unauthenticated,
        refreshTokenLink(client),
      ),
      mainHttpLink,
    ]);

    client.setLink(
      !IS_CLIENT
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            forwardCookieLink,
            apolloLinks,
          ])
        : apolloLinks,
    );

    return client;
  };

  return { makeClient };
};
