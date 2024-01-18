import { gql } from "@apollo/client";

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshAccess($refreshTokenDto: RefreshTokenDto!) {
    refreshAccess(refreshTokenDto: $refreshTokenDto) {
      accessToken
    }
  }
`;
