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

import { UserCitiesWeatherQuery } from '@/services';

import { useCurrentCityWeatherInfo } from '../CurrentCityWeatherInfo';
import { useSubscriptionError } from '../SubscriptionError';
import { useWeatherPaginationInfo } from '../WeatherPaginationInfo';

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
  queryData: ApolloQueryResult<UserCitiesWeatherQuery> | null;
  queryError: ApolloError | null;
};

export const WeatherCardsListProvider: FC<Props> = ({ children, queryData, queryError }) => {
  const [weatherData, setWeatherData] = useState<UserCitiesWeatherQuery | undefined>(
    queryData?.data,
  );
  const { setTotalCount } = useWeatherPaginationInfo();
  const { setCurrentCityWeatherInfo } = useCurrentCityWeatherInfo();
  const { errorHandler } = useSubscriptionError();

  useEffect(() => {
    try {
      if (queryData) {
        const { data, errors } = queryData;

        if (errors?.length) {
          throw new ApolloError({ graphQLErrors: errors });
        }

        if (data.userCitiesWeather) {
          setWeatherData(data);
          setTotalCount(data.userCitiesWeather.paginationInfo?.totalCount ?? 0);
          setCurrentCityWeatherInfo({ info: data.userCitiesWeather.edges[0] });
        }
      } else if (queryError) {
        throw queryError;
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        errorHandler(error);
      }
    }
  }, [queryData, queryError]);

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
