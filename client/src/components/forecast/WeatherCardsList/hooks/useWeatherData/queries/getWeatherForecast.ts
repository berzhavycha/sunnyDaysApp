import { gql } from '@apollo/client';

export const GET_USER_CITIES_WEATHER = gql`
  query {
    getUserCitiesWeather(forecastParams:{forecastDaysAmount:3,citiesLimit:10 }) {
        city,
        tempCelsius,
        tempFahrenheit,
        text,
        humidity,
        daysForecast {
            tempCelsius,
            tempFahrenheit,
            text,
            humidity,
            dayOfWeek,
        },
    }
  }
`;
