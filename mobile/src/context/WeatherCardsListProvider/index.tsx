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

import { UserCitiesWeatherQuery } from '@/hooks';
import { MOCKED_WEATHER_CARD } from '@/shared';

type ContextType = {
  isAddingCard: boolean;
  setIsAddingCard: Dispatch<SetStateAction<boolean>>;
  weatherData: UserCitiesWeatherQuery | undefined;
  setWeatherData: Dispatch<SetStateAction<UserCitiesWeatherQuery | undefined>>;
  isDeleting: boolean;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
  cityToDelete: string;
  setCityToDelete: Dispatch<SetStateAction<string>>;
  loadingCardErrorHandler: () => void;
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
  const [weatherData, setWeatherData] = useState<UserCitiesWeatherQuery>();
  const [isAddingCard, setIsAddingCard] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [cityToDelete, setCityToDelete] = useState<string>('');

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
      });
    }
  }, [isAddingCard]);

  const loadingCardErrorHandler = (): void => {
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
    });
  };

  const contextValue: ContextType = {
    isAddingCard,
    setIsAddingCard,
    weatherData,
    setWeatherData,
    isDeleting,
    setIsDeleting,
    cityToDelete,
    setCityToDelete,
    loadingCardErrorHandler,
  };

  return (
    <WeatherCardsListContext.Provider value={contextValue}>
      {children}
    </WeatherCardsListContext.Provider>
  );
};
