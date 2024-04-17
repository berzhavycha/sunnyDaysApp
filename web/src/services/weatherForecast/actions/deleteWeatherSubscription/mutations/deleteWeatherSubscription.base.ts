import { gql } from '@apollo/client';

export const DELETE_WEATHER_SUBSCRIPTION = gql`
  mutation DeleteWeatherSubscription($city: DeleteCityInput!) {
    deleteWeatherSubscription(input: $city) {
      __typename
      id
    }
  }
`;
