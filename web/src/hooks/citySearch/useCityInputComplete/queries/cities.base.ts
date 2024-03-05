import { gql } from '@apollo/client';

export const CITIES = gql`
  query Cities(
    $prefix: String!
    $sort: String!
    $offset: Int!
    $limit: Int!
    $minPopulation: Int!
  ) {
    citiesByPrefix(
      prefix: $prefix
      sort: $sort
      offset: $offset
      limit: $limit
      minPopulation: $minPopulation
    ) {
      name
    }
  }
`;
