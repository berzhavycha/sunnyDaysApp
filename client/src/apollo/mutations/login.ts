import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation login($userDto: userDto!) {
    signIn(userDto: $userDto) {
      accessToken
      refreshToken
    }
  }
`;
