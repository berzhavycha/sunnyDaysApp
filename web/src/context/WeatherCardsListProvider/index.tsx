'use client';

import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';

import { UserCitiesWeatherQuery } from '@/services';

import { useCurrentCityWeatherInfo } from '../CurrentCityWeatherInfo';
import { useSubscriptionError } from '../SubscriptionError';
import { useWeatherPaginationInfo } from '../WeatherPaginationInfo';
import { useProcessResponse } from '@/hooks';

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
  const { setTotalCount } = useWeatherPaginationInfo();
  const { setCurrentCityWeatherInfo } = useCurrentCityWeatherInfo();
  const { errorHandler } = useSubscriptionError();

  const [weatherData, setWeatherData] = useState<UserCitiesWeatherQuery | undefined>(
    JSON.parse(weatherResponse).responseData?.data,
  );

  const onSuccess = useCallback((data: UserCitiesWeatherQuery) => {
    setWeatherData(data);
    setTotalCount(data.userCitiesWeather.paginationInfo?.totalCount ?? 0);
    setCurrentCityWeatherInfo({ info: data.userCitiesWeather.edges[0] });
  }, [setWeatherData, setTotalCount, setCurrentCityWeatherInfo])

  useProcessResponse<UserCitiesWeatherQuery>({
    jsonResponse: weatherResponse,
    onSuccess,
    onError: errorHandler
  })

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
