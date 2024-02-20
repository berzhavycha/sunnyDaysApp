import { gql } from '@apollo/client';

export const CITY_SEARCH_STATUS = gql`
  query CitySearchStatus {
    citySearchStatus
  }
`;
