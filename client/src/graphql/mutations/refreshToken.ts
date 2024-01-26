import { gql } from '@apollo/client';

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshAccess($refreshTokenInput: RefreshTokenInput!) {
    refreshAccess(refreshTokenDto: $refreshTokenInput) {
      accessToken,
      refreshToken
    }
  }
`;
