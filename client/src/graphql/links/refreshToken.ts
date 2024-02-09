import { ApolloLink, ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { refreshAccessToken } from '../utils';

export const refreshTokenLink = (apolloClient: ApolloClient<NormalizedCacheObject>): ApolloLink => {
  return setContext(async () => {
    await refreshAccessToken(apolloClient);
  })
}
