import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { REFRESH_TOKEN_MUTATION } from '../mutations';

export const refreshAccessToken = async (
  apolloClient: ApolloClient<NormalizedCacheObject>,
): Promise<void> => {
  await apolloClient.mutate({
    mutation: REFRESH_TOKEN_MUTATION,
  });
};
