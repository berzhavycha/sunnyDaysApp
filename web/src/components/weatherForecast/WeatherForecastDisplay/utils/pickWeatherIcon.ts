import { weatherIconMapping } from '../../constants';

export const pickWeatherIcon = (text: string): keyof typeof weatherIconMapping => {
  return Object.keys(weatherIconMapping).find((key) =>
    text.toLowerCase().includes(key),
  ) as keyof typeof weatherIconMapping;
};