import { gql } from '@apollo/client';

export const IS_USER_SIGNED_IN = gql`
  query isUserSignedIn {
    isUserSignedIn 
  }
`;
