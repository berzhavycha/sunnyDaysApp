import { gql } from '@apollo/client';

export const DELETE_WEATHER_SUBSCRIPTION = gql`
  mutation DeleteWeatherSubscription($city: String!) {
    deleteWeatherSubscription(city: $city) {
      __typename
    }
  }
`;
