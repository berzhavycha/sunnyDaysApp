import { resolvers } from '../../resolvers';
import { errorLink, refreshTokenLink, mainHttpLink, forwardCookieLink } from '../../links';
import { typePolicies } from '../../typePolicies';
import { NormalizedCacheObject, ApolloLink } from '@apollo/client';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { decrypt } from '@/shared';
import { SECRET_COOKIE_KEY } from '@/global';

type UseMakeClientReturn = {
  makeClient: () => NextSSRApolloClient<NormalizedCacheObject>;
};

export const useMakeClient = (tokensHash: string): UseMakeClientReturn => {
  const makeClient = (): NextSSRApolloClient<NormalizedCacheObject> => {
    const client = new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache({
        typePolicies,
      }),
      resolvers,
    });

    const commonLinks = [
      errorLink.split(
        (operation) => operation.getContext().unauthenticated,
        refreshTokenLink(client),
      )
    ]

    const serverApolloLinks = ApolloLink.from([
      ...commonLinks,
      mainHttpLink,
    ]);

    const clientApolloLinks = ApolloLink.from([
      ...commonLinks,
      forwardCookieLink('tokens', decrypt(tokensHash, SECRET_COOKIE_KEY)),
      mainHttpLink,
    ]);


    client.setLink(
      typeof window === undefined
        ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          serverApolloLinks
        ])
        : clientApolloLinks,
    );

    return client;
  };

  return { makeClient };
};
