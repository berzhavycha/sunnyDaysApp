'use client';

import { ApolloError, ApolloQueryResult } from '@apollo/client';
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

import { useCurrentCityWeatherInfo } from '../CurrentCityWeatherInfo';
import { useSubscriptionError } from '../SubscriptionError';
import { useWeatherPaginationInfo } from '../WeatherPaginationInfo';

type ContextType = {
  weatherData: UserCitiesWeatherQuery;
  setWeatherData: Dispatch<SetStateAction<UserCitiesWeatherQuery>>;
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
  weatherResponse: ApolloQueryResult<UserCitiesWeatherQuery>;
};

export const WeatherCardsListProvider: FC<Props> = ({ children, weatherResponse }) => {
  const [weatherData, setWeatherData] = useState<UserCitiesWeatherQuery>(weatherResponse.data);
  const { setTotalCount } = useWeatherPaginationInfo();
  const { setCurrentCityWeatherInfo } = useCurrentCityWeatherInfo();
  const { errorHandler, setError } = useSubscriptionError();

  useEffect(() => {
    try {
      const { data, errors } = weatherResponse;

      if (errors?.length) {
        throw new ApolloError({ graphQLErrors: errors });
      }

      if (data.userCitiesWeather) {
        setError({ message: '' });
        setWeatherData(data);
        setTotalCount(data.userCitiesWeather.paginationInfo?.totalCount ?? 0);
        setCurrentCityWeatherInfo({ info: data.userCitiesWeather.edges[0] });
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        errorHandler(error);
      }
    }
  }, [weatherResponse]);

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
