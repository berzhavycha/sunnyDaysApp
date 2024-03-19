'use client';

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

import { WeatherForecast, useResizeWindow } from '@/hooks';
import { MD_BREAKPOINT } from '@/shared';

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
  setCurrentForecastDay: Dispatch<SetStateAction<string>>;
  isVisible: boolean,
  setIsVisible: Dispatch<SetStateAction<boolean>>
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

export const isWindowMoreThanMd = typeof window !== "undefined" && window.innerWidth > MD_BREAKPOINT

export const CurrentCityWeatherInfoProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentCityWeatherInfo, setCurrentCityWeatherInfo] =
    useState<CurrentCityWeatherInfoState>();
  const [currentForecastDay, setCurrentForecastDay] = useState<string>('');
  const [shownWeatherInfo, setShownWeatherInfo] = useState<InfoType>();
  const [isTodayCurrentWeather, setIsTodayCurrentWeather] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true)

  useResizeWindow(() => setIsVisible(isWindowMoreThanMd))

  useEffect(() => {
    setIsVisible(isWindowMoreThanMd)
  }, [])

  useEffect(() => {
    if (currentCityWeatherInfo?.info?.city) {
      setShownWeatherInfo(currentCityWeatherInfo.info);
    }
  }, [currentCityWeatherInfo?.info?.city]);

  const onTodayCurrentWeather = (): void => {
    if (shownWeatherInfo) {
      setCurrentForecastDay('');
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
    setCurrentForecastDay,
    isVisible,
    setIsVisible
  };

  return (
    <CurrentCityWeatherContext.Provider value={contextValue}>
      {children}
    </CurrentCityWeatherContext.Provider>
  );
};
