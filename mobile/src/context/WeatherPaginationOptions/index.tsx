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

import { Env } from '@/env';
import { UserCitiesWeatherQueryVariables } from '@/hooks/weatherForecast/useWeatherData/queries';
import { useCurrentUser } from '../CurrentUser';
import { START_PAGE_NUMBER } from './constants';

export type WeatherPaginationQueryOptionsState = {
  offset: number;
  limit: number;
  order: string;
};

type ContextType = {
  paginationOptions: WeatherPaginationQueryOptionsState;
  updatePaginationOptions: (newOptions: Partial<UserCitiesWeatherQueryVariables>) => void;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  isFetching: boolean;
  setIsFetching: Dispatch<SetStateAction<boolean>>;
  totalCount: number;
  setTotalCount: Dispatch<SetStateAction<number>>;
  totalPages: number;
  paginationPageNumbers: number[];
};

const CurrentPaginationQueryOptionsContext = createContext<ContextType | null>(null);

export const useWeatherPaginationQueryOptions = (): ContextType => {
  const paginationOptionsContext = useContext(CurrentPaginationQueryOptionsContext);

  if (!paginationOptionsContext) {
    throw new Error(
      'useWeatherPaginationOptions must be used within an WeatherPaginationOptionsProvider',
    );
  }

  return paginationOptionsContext;
};

export const WeatherPaginationQueryOptionsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { currentUser } = useCurrentUser();
  const [currentPage, setCurrentPage] = useState<number>(START_PAGE_NUMBER);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [paginationPageNumbers, setPaginationPageNumbers] = useState<number[]>([]);

  const [paginationOptions, setPaginationOptions] = useState<WeatherPaginationQueryOptionsState>({
    offset: 0,
    limit: Env.WEATHER_CITIES_LIMIT,
    order: Env.WEATHER_CITIES_ORDER,
  });

  useEffect(() => {
    setTotalPages(Math.ceil(totalCount / paginationOptions.limit));
    setPaginationPageNumbers(Array.from({ length: totalPages }, (_, index) => index + 1));
  }, [paginationOptions.limit, totalPages, totalCount]);

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
    isFetching,
    setIsFetching,
    totalCount,
    setTotalCount,
    totalPages,
    paginationPageNumbers,
  };

  return (
    <CurrentPaginationQueryOptionsContext.Provider value={contextValue}>
      {children}
    </CurrentPaginationQueryOptionsContext.Provider>
  );
};
