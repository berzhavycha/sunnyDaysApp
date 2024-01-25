import { gql } from '@apollo/client';

export const ADD_WEATHER_SUBSCRIPTION = gql`
  mutation AddWeatherSubscription($city: String!) {
    addWeatherSubscriptions(city: $city) {
      subscriptionId
    }
}
`;

