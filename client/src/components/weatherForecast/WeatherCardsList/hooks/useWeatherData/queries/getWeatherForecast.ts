import { gql } from '@apollo/client';

export const GET_USER_CITIES_WEATHER = gql`
  query UserCitiesWeather($forecastParams: ForecastParamsInput!) {
    userCitiesWeather(forecastParamsInput: $forecastParams) {
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