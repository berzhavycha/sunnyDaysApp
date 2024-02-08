import { gql } from '@apollo/client';

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($userDto: Credentials!) {
    signUp(input: $userDto) {
      message
    }
  }
`;
