import { gql } from '@apollo/client';

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshAccess($refreshTokenDto: refreshTokenDto!) {
    refreshAccess(refreshTokenDto: $refreshTokenDto) {
      accessToken,
      refreshToken
    }
  }
`;
