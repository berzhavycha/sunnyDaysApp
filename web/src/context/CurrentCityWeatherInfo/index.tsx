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

import { WeatherForecast } from '@/shared';
import { useSubscriptionError } from '../SubscriptionError';

type InfoType = WeatherForecast & {
  dayOfWeek?: string;
};

export type CurrentCityWeatherInfoState = {
  info: InfoType | undefined;
};

type ContextType = {
  currentCityWeatherInfo: CurrentCityWeatherInfoState;
  setCurrentCityWeatherInfo: Dispatch<SetStateAction<CurrentCityWeatherInfoState>>;
  shownWeatherInfo?: InfoType
  setShownWeatherInfo: Dispatch<SetStateAction<InfoType | undefined>>;
  isVisibleBelowMedium: boolean;
  setIsVisibleBelowMedium: Dispatch<SetStateAction<boolean>>;
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

type Props = PropsWithChildren & {
  weatherResponse: string;
};

export const CurrentCityWeatherInfoProvider: FC<Props> = ({ weatherResponse, children }) => {
  const { responseData } = JSON.parse(weatherResponse);

  const { errorHandler } = useSubscriptionError()
  const [currentCityWeatherInfo, setCurrentCityWeatherInfo] = useState<CurrentCityWeatherInfoState>(
    {
      info: responseData?.data?.userCitiesWeather.edges[0],
    },
  );
  const [shownWeatherInfo, setShownWeatherInfo] = useState<InfoType>();
  const [isVisibleBelowMedium, setIsVisibleBelowMedium] = useState<boolean>(false);

  useEffect(() => {
    if (currentCityWeatherInfo?.info?.city) {
      setShownWeatherInfo(currentCityWeatherInfo.info);
    }
  }, [currentCityWeatherInfo?.info?.city]);

  useEffect(() => {
    setCurrentCityWeatherInfo({ info: responseData?.data?.userCitiesWeather.edges[0] })
    if (responseData?.errors) {
      errorHandler(responseData.errors)
    }
  }, [weatherResponse])

  const contextValue: ContextType = {
    currentCityWeatherInfo,
    setCurrentCityWeatherInfo,
    shownWeatherInfo,
    setShownWeatherInfo,
    isVisibleBelowMedium,
    setIsVisibleBelowMedium,
  };

  return (
    <CurrentCityWeatherContext.Provider value={contextValue}>
      {children}
    </CurrentCityWeatherContext.Provider>
  );
};
