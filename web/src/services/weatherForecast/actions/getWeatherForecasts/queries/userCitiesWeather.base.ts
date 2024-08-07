import { gql } from '@apollo/client';

const WeatherForecastFragment = gql`
  fragment WeatherForecast on WeatherForecast {
    id
    city
    celsius
    fahrenheit
    text
    humidity
    precip
    windSpeed
    time
    daysForecast {
      id
      celsius
      fahrenheit
      text
      humidity
      precip
      windSpeed
      dayOfWeek
      minCelsius
      maxCelsius
      minFahrenheit
      maxFahrenheit
    }
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
