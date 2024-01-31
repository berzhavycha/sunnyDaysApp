import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useWeatherSubscription } from '@/hooks';
import { useWeatherData } from '@/components/forecast/WeatherCardsList/hooks';
import { REACT_APP_MAX_WEATHER_CITIES_AMOUNT } from '@env';

type UseAddWeatherSubscription = {
  addSubscription: () => Promise<void>;
  additionLoading: boolean;
  error: string;
};

export const useAddSubscription = (
  city: string,
  setCity: Dispatch<SetStateAction<string>>,
): UseAddWeatherSubscription => {
  const [error, setError] = useState<string>('');
  const { addSubscriptionHandler, additionLoading } = useWeatherSubscription();
  const { data, error: weatherRequestError } = useWeatherData();

  useEffect(() => {
    if (weatherRequestError?.message) {
      setError(weatherRequestError?.message);
    }
  }, [weatherRequestError, data]);

  const addSubscription = async (): Promise<void> => {
    try {
      setError('');

      if (!city) {
        throw new Error('Please enter the city!');
      }

      if (data?.userCitiesWeather.length === +REACT_APP_MAX_WEATHER_CITIES_AMOUNT) {
        throw new Error(`You cannot have more than ${REACT_APP_MAX_WEATHER_CITIES_AMOUNT} cities.`);
      }

      const isCityAlreadyExists = data?.userCitiesWeather.some((forecast) =>
        forecast.city.includes(city),
      );
      if (isCityAlreadyExists) {
        throw new Error(`You already have a subscription to ${city}.`);
      }

      await addSubscriptionHandler(city);
      setCity('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return {
    additionLoading,
    addSubscription,
    error,
  };
};
