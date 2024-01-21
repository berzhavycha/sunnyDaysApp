import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { REFRESH_TOKEN_MUTATION } from '../mutations';
import * as SecureStore from 'expo-secure-store';

export const refreshAccessToken = async (
  apolloClient: ApolloClient<NormalizedCacheObject>,
): Promise<string> => {
  try {
    const tokens = (await SecureStore.getItemAsync('tokens')) || '';
    const { refreshToken } = JSON.parse(tokens);

    const refreshResolverResponse = await apolloClient.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      variables: {
        refreshTokenDto: { refreshToken },
      },
    });

    const accessToken = refreshResolverResponse.data?.refreshAccess.accessToken;
    const newRefreshToken = refreshResolverResponse.data?.refreshAccess.refreshToken;

    if (accessToken) {
      await SecureStore.setItemAsync(
        'tokens',
        JSON.stringify({ accessToken, refreshToken: newRefreshToken }),
      );
      return accessToken;
    } else {
      throw new Error('Access token not found in the response');
    }
  } catch (err) {
    throw err;
  }
};
