import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation SignIn($userDto: Credentials!) {
    signIn(input: $userDto) {
      email
    }
  }
`;
