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

import { useQueryParams, UserCitiesWeatherQuery, UserCitiesWeatherQueryVariables } from '@/hooks';
import { useCurrentCityWeatherInfo } from '../CurrentCityWeatherInfo';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { useSubscriptionError } from '../SubscriptionError';
import { PaginationQueryOptionsState } from '@/shared';
import { useSearchParams } from 'next/navigation';
import { env } from '@/core/env';

type ContextType = {
  weatherData: UserCitiesWeatherQuery
  setWeatherData: Dispatch<SetStateAction<UserCitiesWeatherQuery>>;
  paginationOptions: PaginationQueryOptionsState;
  setPaginationOptions: Dispatch<SetStateAction<PaginationQueryOptionsState>>;
  updatePaginationOptions: (newOptions: Partial<UserCitiesWeatherQueryVariables>) => void;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalCount: number;
  setTotalCount: Dispatch<SetStateAction<number>>;
  totalPages: number;
  paginationPageNumbers: number[];
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
  const [weatherData, setWeatherData] = useState<UserCitiesWeatherQuery>(weatherResponse.data);
  const { setCurrentCityWeatherInfo } = useCurrentCityWeatherInfo()
  const { errorHandler } = useSubscriptionError()

  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [paginationPageNumbers, setPaginationPageNumbers] = useState<number[]>([]);

  const searchParams = useSearchParams();
  const { updateQueryParams } = useQueryParams();

  const [paginationOptions, setPaginationOptions] = useState<PaginationQueryOptionsState>({
    offset: +(searchParams.get('page') ?? 0),
    limit: +(searchParams.get('perPage') ?? env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT),
    order: searchParams.get('order') ?? env.NEXT_PUBLIC_WEATHER_CITIES_ORDER,
  });

  const [currentPage, setCurrentPage] = useState<number>(
    paginationOptions.offset / paginationOptions.limit + 1,
  );

  useEffect(() => {
    setCurrentPage(paginationOptions.offset / paginationOptions.limit + 1);
    const totalPagesRes = Math.ceil(totalCount / paginationOptions.limit);
    setTotalPages(totalPagesRes);
    setPaginationPageNumbers(Array.from({ length: totalPagesRes }, (_, index) => index + 1));
  }, [paginationOptions, totalCount]);

  const updatePaginationOptions = (newOptions: Partial<UserCitiesWeatherQueryVariables>): void => {
    const { offset, limit, ...restOptions } = newOptions;

    updateQueryParams({
      page: offset ?? paginationOptions.offset,
      perPage: limit ?? paginationOptions.limit,
      ...restOptions,
    });

    setPaginationOptions({
      ...paginationOptions,
      ...newOptions
    });
  };

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

  const contextValue: ContextType = {
    weatherData,
    setWeatherData,
    paginationOptions,
    updatePaginationOptions,
    setPaginationOptions,
    currentPage,
    setCurrentPage,
    totalCount,
    setTotalCount,
    totalPages,
    paginationPageNumbers,
  };

  return (
    <WeatherCardsListContext.Provider value={contextValue}>
      {children}
    </WeatherCardsListContext.Provider>
  );
};
