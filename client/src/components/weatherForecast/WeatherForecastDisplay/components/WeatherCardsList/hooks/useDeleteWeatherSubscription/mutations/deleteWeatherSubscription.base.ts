import { gql } from '@apollo/client';

export const DELETE_WEATHER_SUBSCRIPTION = gql`
  mutation DeleteWeatherSubscription($city: CityInput!) {
    deleteWeatherSubscription(input: $city) {
      id
    }
  }
`;
