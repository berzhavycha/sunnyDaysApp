import { gql } from '@apollo/client';

export const SIGN_IN_MUTATION = gql`
  mutation SignIn($userDto: userDto!) {
    signIn(userDto: $userDto) {
      accessToken
      refreshToken
    }
  }
`;
