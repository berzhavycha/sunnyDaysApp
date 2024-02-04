import { gql } from '@apollo/client';

export const GET_USER_CITIES_WEATHER = gql`
  query UserCitiesWeather($citiesLimit: Int!, $forecastDaysAmount: Int!) {
    userCitiesWeather(citiesLimit: $citiesLimit, forecastDaysAmount: $forecastDaysAmount) {
      city
      tempFahrenheit
      tempCelsius
      text
      humidity
      daysForecast {
        tempCelsius
        tempFahrenheit
        text
        humidity
        dayOfWeek
      }
    }
  }
`;
