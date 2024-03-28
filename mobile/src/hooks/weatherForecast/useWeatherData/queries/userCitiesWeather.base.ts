import { gql } from '@apollo/client';

export const WeatherForecastFragment = gql`
  fragment WeatherForecast on WeatherForecast {
    id
    city
    celsius
    fahrenheit
    text
    humidity
    daysForecast {
      id
      celsius
      fahrenheit
      text
      humidity
      dayOfWeek
    }
    _deleted @client
    _loading @client
  }
`;

export const USER_CITIES_WEATHER = gql`
  query UserCitiesWeather($offset: Int!, $limit: Int!, $order: String!, $forecastDaysAmount: Int!) {
    userCitiesWeather(
      offset: $offset
      limit: $limit
      order: $order
      forecastDaysAmount: $forecastDaysAmount
    ) {
      edges {
        ...WeatherForecast
      }
      paginationInfo {
        totalCount
      }
    }
  }
  ${WeatherForecastFragment}
`;
