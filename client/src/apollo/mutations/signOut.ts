import { gql } from "@apollo/client";

export const SIGH_OUT_MUTATION = gql`
  mutation InvalidateToken($authorization: String!) {
    invalidateToken(authorization: $authorization)
  }
`;
