import { gql } from '@apollo/client';

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($userDto: UserInput!) {
    signUp(userInput: $userDto)
  }
`;
