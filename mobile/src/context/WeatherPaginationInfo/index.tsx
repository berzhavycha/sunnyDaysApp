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
import { Env } from '@/env';
import { UserCitiesWeatherQueryVariables } from '@/hooks/weatherForecast/useWeatherData/queries';

type ContextType = {
  paginationOptions: PaginationQueryOptionsState;
  setPaginationOptions: Dispatch<SetStateAction<PaginationQueryOptionsState>>;
  updatePaginationOptions: (newOptions: Partial<UserCitiesWeatherQueryVariables>) => void;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalCount: number;
  setTotalCount: Dispatch<SetStateAction<number>>;
  totalPages: number;
  paginationPageNumbers: number[];
  isFetching: boolean,
  setIsFetching: Dispatch<SetStateAction<boolean>>
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
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [paginationPageNumbers, setPaginationPageNumbers] = useState<number[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const [paginationOptions, setPaginationOptions] = useState<PaginationQueryOptionsState>({
    offset: 0,
    limit: Env.WEATHER_CITIES_LIMIT,
    order: Env.WEATHER_CITIES_ORDER,
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
    setPaginationOptions({
      ...paginationOptions,
      ...newOptions,
    });
  };

  const contextValue: ContextType = {
    paginationOptions,
    updatePaginationOptions,
    setPaginationOptions,
    currentPage,
    setCurrentPage,
    totalCount,
    setTotalCount,
    totalPages,
    paginationPageNumbers,
    isFetching,
    setIsFetching
  };

  return (
    <WeatherPaginationInfoContext.Provider value={contextValue}>
      {children}
    </WeatherPaginationInfoContext.Provider>
  );
};
