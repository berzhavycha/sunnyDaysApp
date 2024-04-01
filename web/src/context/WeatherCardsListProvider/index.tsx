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

import { UserCitiesWeatherQuery } from '@/hooks/weatherForecast/useWeatherData/queries';
import { MOCKED_WEATHER_CARD } from '@/shared';

type ContextType = {
  isAddingCard: boolean;
  setIsAddingCard: Dispatch<SetStateAction<boolean>>;
  weatherData: UserCitiesWeatherQuery | null;
  setWeatherData: Dispatch<SetStateAction<UserCitiesWeatherQuery | null>>;
  handleLoadingCardOnError: () => void;
};

const WeatherCardsListContext = createContext<ContextType | null>(null);

export const useWeatherCardsList = (): ContextType => {
  const context = useContext(WeatherCardsListContext);

  if (!context) {
    throw new Error('useWeatherCardsList must be used within an  WeatherCardsListProvider');
  }

  return context;
};

export const WeatherCardsListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<UserCitiesWeatherQuery | null>(null);
  const [isAddingCard, setIsAddingCard] = useState<boolean>(false);

  useEffect(() => {
    if (isAddingCard) {
      setWeatherData((prevData) => {
        if (prevData) {
          return {
            ...prevData,
            userCitiesWeather: {
              ...prevData.userCitiesWeather,
              edges: [
                ...prevData.userCitiesWeather.edges,
                {
                  ...MOCKED_WEATHER_CARD,
                  _loading: true,
                },
              ],
            },
          };
        }

        return null;
      });
    }
  }, [isAddingCard]);

  const handleLoadingCardOnError = (): void => {
    setWeatherData((prevData) => {
      if (prevData) {
        return {
          ...prevData,
          userCitiesWeather: {
            ...prevData.userCitiesWeather,
            edges: [...prevData.userCitiesWeather.edges].filter((edge) => !edge._loading),
          },
        };
      }

      return null;
    });
  };

  const contextValue: ContextType = {
    isAddingCard,
    setIsAddingCard,
    weatherData,
    setWeatherData,
    handleLoadingCardOnError,
  };

  return (
    <WeatherCardsListContext.Provider value={contextValue}>
      {children}
    </WeatherCardsListContext.Provider>
  );
};
