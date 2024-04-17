import { gql } from '@apollo/client';

export const ADD_WEATHER_SUBSCRIPTION = gql`
  mutation AddWeatherSubscription($city: AddCityInput!) {
    addWeatherSubscription(input: $city) {
      id
    }
  }
`;
