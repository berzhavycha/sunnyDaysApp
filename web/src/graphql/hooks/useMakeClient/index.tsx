import { NormalizedCacheObject, ApolloLink } from '@apollo/client';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

import { IS_CLIENT } from '@/shared';
import { resolvers } from '../../resolvers';
import { errorLink, refreshTokenLink, mainHttpLink, forwardCookieLink } from '../../links';
import { typePolicies } from '../../typePolicies';

type UseMakeClientReturn = {
  makeClient: () => NextSSRApolloClient<NormalizedCacheObject>;
};

export const useMakeClient = (): UseMakeClientReturn => {
  const makeClient = (): NextSSRApolloClient<NormalizedCacheObject> => {
    const client = new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache({
        typePolicies,
      }),
      resolvers,
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
