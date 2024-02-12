import { gql } from '@apollo/client';

export const GET_CITIES = gql`
  query Cities($prefix: String!, $sort: String!, $offset: Int!, $limit: Int!) {
    citiesByPrefix(prefix: $prefix, sort: $sort, offset: $offset, limit: $limit) {
      name
    }
  }
`;
