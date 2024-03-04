import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { RefreshAccessDocument } from '../mutations';

export const refreshAccessToken = async (
  apolloClient: ApolloClient<NormalizedCacheObject>,
): Promise<void> => {
  await apolloClient.mutate({
    mutation: RefreshAccessDocument,
  });
};
