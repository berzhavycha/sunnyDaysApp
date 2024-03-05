import { gql } from '@apollo/client';

export const REFRESH_TOKEN = gql`
  mutation RefreshAccess {
    refreshAccess {
      message
    }
  }
`;
