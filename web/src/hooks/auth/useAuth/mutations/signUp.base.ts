import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation SignUp($userDto: Credentials!) {
    signUp(input: $userDto) {
      email
    }
  }
`;
