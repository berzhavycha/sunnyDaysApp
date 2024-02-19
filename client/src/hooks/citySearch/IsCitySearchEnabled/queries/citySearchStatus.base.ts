import { gql } from '@apollo/client';

export const GET_CITY_SEARCH_STATUS = gql`
  query CitySearchStatus {
    citySearchStatus
  }
`;
