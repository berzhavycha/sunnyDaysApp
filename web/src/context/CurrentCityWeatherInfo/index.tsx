'use client';

import { WeatherForecast } from '@/hooks';
import {
  FC,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

type InfoType = WeatherForecast & {
  dayOfWeek?: string;
};

export type CurrentCityWeatherInfoState = {
  info: InfoType;
};

type ContextType = {
  currentCityWeatherInfo: CurrentCityWeatherInfoState | undefined;
  setCurrentCityWeatherInfo: Dispatch<SetStateAction<CurrentCityWeatherInfoState | undefined>>;
  isTodayCurrentWeather: boolean;
  setIsTodayCurrentWeather: Dispatch<SetStateAction<boolean>>;
  setShownWeatherInfo: Dispatch<SetStateAction<InfoType | undefined>>;
  onTodayCurrentWeather: () => void;
  currentForecastDay: string;
  setCurrentForecastDay: Dispatch<SetStateAction<string>>
};

const CurrentCityWeatherContext = createContext<ContextType | null>(null);

export const useCurrentCityWeatherInfo = (): ContextType => {
  const context = useContext(CurrentCityWeatherContext);

  if (!context) {
    throw new Error(
      'useCurrentCityWeatherInfo must be used within an CurrentCityWeatherInfoProvider',
    );
  }

  return context;
};

export const CurrentCityWeatherInfoProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentCityWeatherInfo, setCurrentCityWeatherInfo] =
    useState<CurrentCityWeatherInfoState>();
  const [currentForecastDay, setCurrentForecastDay] = useState<string>('')
  const [shownWeatherInfo, setShownWeatherInfo] = useState<InfoType>();
  const [isTodayCurrentWeather, setIsTodayCurrentWeather] = useState<boolean>(true);

  useEffect(() => {
    if (currentCityWeatherInfo?.info?.city) {
      setShownWeatherInfo(currentCityWeatherInfo.info);
    }
  }, [currentCityWeatherInfo?.info?.city]);

  const onTodayCurrentWeather = (): void => {
    if (shownWeatherInfo) {
      setCurrentForecastDay('')
      setIsTodayCurrentWeather(true);
      setCurrentCityWeatherInfo({ info: shownWeatherInfo });
    }
  };

  const contextValue: ContextType = {
    currentCityWeatherInfo,
    setCurrentCityWeatherInfo,
    isTodayCurrentWeather,
    setIsTodayCurrentWeather,
    setShownWeatherInfo,
    onTodayCurrentWeather,
    currentForecastDay,
    setCurrentForecastDay
  };

  return (
    <CurrentCityWeatherContext.Provider value={contextValue}>
      {children}
    </CurrentCityWeatherContext.Provider>
  );
};
