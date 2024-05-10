'use client';

import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { UserCitiesWeatherQuery } from '@/services';

import { useCurrentCityWeatherInfo } from '../CurrentCityWeatherInfo';
import { useSubscriptionError } from '../SubscriptionError';
import { processResponse } from '@/shared';

type ContextType = {
  weatherData: UserCitiesWeatherQuery | undefined;
  setWeatherData: Dispatch<SetStateAction<UserCitiesWeatherQuery | undefined>>;
};

const WeatherCardsListContext = createContext<ContextType | null>(null);

export const useWeatherCardsList = (): ContextType => {
  const context = useContext(WeatherCardsListContext);

  if (!context) {
    throw new Error('useWeatherCardsList must be used within an  WeatherCardsListProvider');
  }

  return context;
};

type Props = PropsWithChildren & {
  weatherResponse: string;
};

export const WeatherCardsListProvider: FC<Props> = ({ children, weatherResponse }) => {
  const { setCurrentCityWeatherInfo } = useCurrentCityWeatherInfo();
  const { errorHandler } = useSubscriptionError();

  const [weatherData, setWeatherData] = useState<UserCitiesWeatherQuery | undefined>(
    JSON.parse(weatherResponse).responseData?.data,
  );

  const onSuccess = (data: UserCitiesWeatherQuery): void => {
    setWeatherData(data);
    setCurrentCityWeatherInfo({ info: data.userCitiesWeather.edges[0] });
  };

  useEffect(() => {
    processResponse({
      jsonResponse: weatherResponse,
      onSuccess,
      onError: errorHandler,
    });
  }, [weatherResponse])

  const contextValue: ContextType = {
    weatherData,
    setWeatherData,
  };

  return (
    <WeatherCardsListContext.Provider value={contextValue}>
      {children}
    </WeatherCardsListContext.Provider>
  );
};
