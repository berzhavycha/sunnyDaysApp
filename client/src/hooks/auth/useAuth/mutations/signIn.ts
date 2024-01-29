import { gql } from '@apollo/client';

export const SIGN_IN_MUTATION = gql`
  mutation SignIn($userDto: UserInput!) {
    signIn(UserInput: $userDto)
  }
`;
