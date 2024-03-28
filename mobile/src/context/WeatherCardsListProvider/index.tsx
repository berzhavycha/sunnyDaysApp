import { MOCKED_WEATHER_CARD } from '@/shared';
import { UserCitiesWeatherQuery } from '@/hooks/weatherForecast/useWeatherData/queries';
import {
  FC,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

type ContextType = {
  isAddingCard: boolean;
  setIsAddingCard: (isAdding: boolean) => void;
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

export const WeatherCardsListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<UserCitiesWeatherQuery>();
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
      });
    }
  }, [isAddingCard]);

  const contextValue: ContextType = {
    isAddingCard,
    setIsAddingCard,
    weatherData,
    setWeatherData,
  };

  return (
    <WeatherCardsListContext.Provider value={contextValue}>
      {children}
    </WeatherCardsListContext.Provider>
  );
};
