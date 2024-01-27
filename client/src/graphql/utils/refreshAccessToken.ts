import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { REFRESH_TOKEN_MUTATION } from '../mutations';

export const refreshAccessToken = async (
  apolloClient: ApolloClient<NormalizedCacheObject>,
): Promise<void> => {
  try {
    await apolloClient.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
    });
  } catch (err) {
    throw err;
  }
};
