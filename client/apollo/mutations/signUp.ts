import { DocumentNode, gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($userDto: userDto!) {
    signUp(userDto: $userDto) {
        accessToken,
        refreshToken
    }
  }
`;

export const SAY_HELLO_QUERY = gql`
  query {
    sayHello
  }
`;