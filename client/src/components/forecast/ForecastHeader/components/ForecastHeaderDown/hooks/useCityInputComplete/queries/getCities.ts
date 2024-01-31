import { gql } from '@apollo/client';

export const GET_CITIES = gql`
  query Cities($namePrefix: String, $sort: String, $first: Int) {
    populatedPlaces(namePrefix: $namePrefix, sort: $sort, first: $first) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
