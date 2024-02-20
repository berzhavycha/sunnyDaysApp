import { gql } from '@apollo/client';

export const USER_CITIES_WEATHER = gql`
  query UserCitiesWeather($citiesLimit: Int!, $forecastDaysAmount: Int!) {
    userCitiesWeather(citiesLimit: $citiesLimit, forecastDaysAmount: $forecastDaysAmount) {
      id
      city
      fahrenheit
      celsius
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
    }
  }
`;
