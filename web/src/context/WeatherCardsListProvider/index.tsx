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

import { UserCitiesWeatherQuery } from '@/hooks';
import { useCurrentCityWeatherInfo } from '../CurrentCityWeatherInfo';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { useSubscriptionError } from '../SubscriptionError';
import { useWeatherPaginationInfo } from '../WeatherPaginationInfo';

type ContextType = {
  isAddingCard: boolean;
  setIsAddingCard: Dispatch<SetStateAction<boolean>>;
  weatherData: UserCitiesWeatherQuery | null
  setWeatherData: Dispatch<SetStateAction<UserCitiesWeatherQuery | null>>;
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

type Props = PropsWithChildren & {
  weatherResponse: ApolloQueryResult<UserCitiesWeatherQuery>
}

export const WeatherCardsListProvider: FC<Props> = ({ children, weatherResponse }) => {
  const { setTotalCount } = useWeatherPaginationInfo()
  const [weatherData, setWeatherData] = useState<UserCitiesWeatherQuery | null>(weatherResponse.data);
  const [isAddingCard, setIsAddingCard] = useState<boolean>(false);
  const { setCurrentCityWeatherInfo } = useCurrentCityWeatherInfo()
  const { errorHandler } = useSubscriptionError()


  useEffect(() => {
    try {
      const { data, errors } = weatherResponse

      if (errors?.length) {
        throw new ApolloError({ graphQLErrors: errors })
      }

      if (data.userCitiesWeather) {
        setWeatherData(data)
        setTotalCount(data.userCitiesWeather.paginationInfo?.totalCount ?? 0);
        setCurrentCityWeatherInfo({ info: data.userCitiesWeather.edges[0] })
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        errorHandler(error)
      }
    }
  }, [weatherResponse])

  const loadingCardErrorHandler = (): void => {

  };

  const contextValue: ContextType = {
    isAddingCard,
    setIsAddingCard,
    weatherData,
    setWeatherData,
    loadingCardErrorHandler,
  };

  return (
    <WeatherCardsListContext.Provider value={contextValue}>
      {children}
    </WeatherCardsListContext.Provider>
  );
};
