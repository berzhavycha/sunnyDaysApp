import { gql } from '@apollo/client';

export const DELETE_WEATHER_SUBSCRIPTION = gql`
  mutation DeleteWeatherSubscription($city: String!) {
    deleteWeatherSubscriptions(city: $city){
        __typename
    }
}
`;

