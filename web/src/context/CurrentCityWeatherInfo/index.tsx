'use client';

import { ApolloQueryResult } from '@apollo/client';
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
import { WeatherForecast } from '@/shared';

type InfoType = WeatherForecast & {
  dayOfWeek?: string;
};

export type CurrentCityWeatherInfoState = {
  info: InfoType | undefined;
};

type ContextType = {
  currentCityWeatherInfo: CurrentCityWeatherInfoState;
  setCurrentCityWeatherInfo: Dispatch<SetStateAction<CurrentCityWeatherInfoState>>;
  isTodayCurrentWeather: boolean;
  setIsTodayCurrentWeather: Dispatch<SetStateAction<boolean>>;
  setShownWeatherInfo: Dispatch<SetStateAction<InfoType | undefined>>;
  onTodayCurrentWeather: () => void;
  currentForecastDay: string;
  setCurrentForecastDay: Dispatch<SetStateAction<string>>;
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
  queryData: ApolloQueryResult<UserCitiesWeatherQuery> | null;
};

export const CurrentCityWeatherInfoProvider: FC<Props> = ({ queryData, children }) => {
  const [currentCityWeatherInfo, setCurrentCityWeatherInfo] = useState<CurrentCityWeatherInfoState>(
    {
      info: queryData?.data?.userCitiesWeather.edges[0],
    },
  );
  const [currentForecastDay, setCurrentForecastDay] = useState<string>('');
  const [shownWeatherInfo, setShownWeatherInfo] = useState<InfoType>();
  const [isTodayCurrentWeather, setIsTodayCurrentWeather] = useState<boolean>(true);
  const [isVisibleBelowMedium, setIsVisibleBelowMedium] = useState<boolean>(false);

  useEffect(() => {
    if (currentCityWeatherInfo?.info?.city) {
      setCurrentForecastDay('');
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
    isVisibleBelowMedium,
    setIsVisibleBelowMedium,
  };

  return (
    <CurrentCityWeatherContext.Provider value={contextValue}>
      {children}
    </CurrentCityWeatherContext.Provider>
  );
};
