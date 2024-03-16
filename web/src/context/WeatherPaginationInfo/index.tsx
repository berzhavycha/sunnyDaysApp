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

import { PaginationQueryOptionsState, START_PAGE_NUMBER } from '@/shared';
import { WEATHER_CITIES_LIMIT, WEATHER_CITIES_ORDER } from '@/global';
import { UserCitiesWeatherQueryVariables } from '@/hooks/weatherForecast/useWeatherData/queries';
import { useCurrentUser } from '../CurrentUser';

type ContextType = {
  paginationOptions: PaginationQueryOptionsState;
  updatePaginationOptions: (newOptions: Partial<UserCitiesWeatherQueryVariables>) => void;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalCount: number;
  setTotalCount: Dispatch<SetStateAction<number>>;
  totalPages: number;
  paginationPageNumbers: number[];
  isSuspenseLoaderBlocked: boolean,
  setIsSuspenseLoaderBlocked: Dispatch<SetStateAction<boolean>>
};

const CurrentPaginationQueryOptionsContext = createContext<ContextType | null>(null);

export const useWeatherPaginationInfo = (): ContextType => {
  const paginationInfo = useContext(CurrentPaginationQueryOptionsContext);

  if (!paginationInfo) {
    throw new Error(
      'useWeatherPaginationInfo must be used within an WeatherPaginationInfoProvider',
    );
  }

  return paginationInfo;
};

export const WeatherPaginationInfoProvider: FC<PropsWithChildren> = ({ children }) => {
  const { currentUser } = useCurrentUser();
  const [currentPage, setCurrentPage] = useState<number>(START_PAGE_NUMBER);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [paginationPageNumbers, setPaginationPageNumbers] = useState<number[]>([]);

  const [isSuspenseLoaderBlocked, setIsSuspenseLoaderBlocked] = useState<boolean>(false)

  const [paginationOptions, setPaginationOptions] = useState<PaginationQueryOptionsState>({
    offset: 0,
    limit: WEATHER_CITIES_LIMIT,
    order: WEATHER_CITIES_ORDER,
  });

  useEffect(() => {
    const totalPagesRes = Math.ceil(totalCount / paginationOptions.limit);
    setTotalPages(totalPagesRes);
    setPaginationPageNumbers(Array.from({ length: totalPagesRes }, (_, index) => index + 1));
  }, [paginationOptions, totalCount]);

  useEffect(() => {
    setPaginationOptions((prevState) => ({
      ...prevState,
      offset: 0,
    }));
  }, [currentUser]);

  const updatePaginationOptions = (newOptions: Partial<UserCitiesWeatherQueryVariables>): void => {
    setPaginationOptions((prevState) => ({
      ...prevState,
      ...newOptions,
    }));
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
    isSuspenseLoaderBlocked,
    setIsSuspenseLoaderBlocked
  };

  return (
    <CurrentPaginationQueryOptionsContext.Provider value={contextValue}>
      {children}
    </CurrentPaginationQueryOptionsContext.Provider>
  );
};