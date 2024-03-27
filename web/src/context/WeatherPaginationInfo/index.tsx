'use client';

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

import { PaginationQueryOptionsState } from '@/shared';
import { env } from '@/core/env';
import { UserCitiesWeatherQueryVariables } from '@/hooks/weatherForecast/useWeatherData/queries';
import { useCurrentUser } from '../CurrentUser';
import { useQueryParams } from '@/hooks';

type ContextType = {
  paginationOptions: PaginationQueryOptionsState;
  updatePaginationOptions: (newOptions: Partial<UserCitiesWeatherQueryVariables>) => void;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalCount: number;
  setTotalCount: Dispatch<SetStateAction<number>>;
  totalPages: number;
  paginationPageNumbers: number[];
};

const WeatherPaginationInfoContext = createContext<ContextType | null>(null);

export const useWeatherPaginationInfo = (): ContextType => {
  const paginationInfo = useContext(WeatherPaginationInfoContext);

  if (!paginationInfo) {
    throw new Error(
      'useWeatherPaginationInfo must be used within an WeatherPaginationInfoProvider',
    );
  }

  return paginationInfo;
};

export const WeatherPaginationInfoProvider: FC<PropsWithChildren> = ({ children }) => {
  const { currentUser } = useCurrentUser();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [paginationPageNumbers, setPaginationPageNumbers] = useState<number[]>([]);

  const { queryParams, updateQueryParams } = useQueryParams()
  
  const [paginationOptions, setPaginationOptions] = useState<PaginationQueryOptionsState>({
    offset: +(queryParams.offset ?? 0),
    limit: +(queryParams.limit ?? env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT),
    order: (queryParams.order ?? env.NEXT_PUBLIC_WEATHER_CITIES_ORDER).toString(),
  });

  const [currentPage, setCurrentPage] = useState<number>(paginationOptions.offset / paginationOptions.limit + 1);

  useEffect(() => {
    setCurrentPage(paginationOptions.offset / paginationOptions.limit + 1)
    const totalPagesRes = Math.ceil(totalCount / paginationOptions.limit);
    setTotalPages(totalPagesRes);
    setPaginationPageNumbers(Array.from({ length: totalPagesRes }, (_, index) => index + 1));
  }, [paginationOptions, totalCount]);

  useEffect(() => {
    setPaginationOptions((prevState) => ({
      ...prevState,
      offset: 0,
    }));

  }, [currentUser?.email]);

  const updatePaginationOptions = (newOptions: Partial<UserCitiesWeatherQueryVariables>): void => {
    updateQueryParams(newOptions)
    setPaginationOptions({
      ...paginationOptions,
      ...newOptions
    });
  };

  const contextValue: ContextType = {
    paginationOptions,
    updatePaginationOptions,
    currentPage,
    setCurrentPage,
    totalCount,
    setTotalCount,
    totalPages,
    paginationPageNumbers,
  };

  return (
    <WeatherPaginationInfoContext.Provider value={contextValue}>
      {children}
    </WeatherPaginationInfoContext.Provider>
  );
};
