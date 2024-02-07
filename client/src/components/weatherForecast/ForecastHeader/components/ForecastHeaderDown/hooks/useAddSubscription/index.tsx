import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useWeatherData } from '@/components/weatherForecast/WeatherCardsList/hooks';
import { REACT_APP_MAX_WEATHER_CITIES_AMOUNT } from '@env';
import { useMutation } from '@apollo/client';
import { AddWeatherSubscriptionDocument } from './mutations';
import { UserCitiesWeatherDocument } from '@/components/weatherForecast/WeatherCardsList/hooks/useWeatherData/queries';

type UseAddSubscriptionReturn = {
  addSubscription: () => Promise<void>;
  loading: boolean;
  error: string;
};

export const useAddSubscription = (
  city: string,
  setCity: Dispatch<SetStateAction<string>>,
): UseAddSubscriptionReturn => {
  const [error, setError] = useState<string>('');
  const [addWeatherSubscription, { loading, error: addingSubscriptionError }] = useMutation(
    AddWeatherSubscriptionDocument,
    {
      refetchQueries: [UserCitiesWeatherDocument],
    },
  );

  const { data, error: weatherRequestError } = useWeatherData();

  useEffect(() => {
    if (weatherRequestError?.message) {
      setError(weatherRequestError?.message);
    }
  }, [weatherRequestError, addingSubscriptionError, data]);

  const addSubscription = async (): Promise<void> => {
    try {
      setError('');

      if (!city) {
        throw new Error('Please enter the city!');
      }

      if (data?.userCitiesWeather.length === +REACT_APP_MAX_WEATHER_CITIES_AMOUNT) {
        throw new Error(`You cannot have more than ${REACT_APP_MAX_WEATHER_CITIES_AMOUNT} cities.`);
      }

      const isCityAlreadyExists = data?.userCitiesWeather.some(
        (forecast) => forecast.city === city,
      );
      if (isCityAlreadyExists) {
        throw new Error(`You already have a subscription to ${city}.`);
      }

      await addWeatherSubscription({
        variables: {
          city: {
            name: city,
          },
        },
      });
      
      setCity('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return {
    loading,
    addSubscription,
    error,
  };
};
