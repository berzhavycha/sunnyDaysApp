'use client';

import { useSearchParams } from 'next/navigation';
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

import { env } from '@/core/env';
import { useQueryParams, UserCitiesWeatherQueryVariables } from '@/hooks';
import { PaginationQueryOptionsState } from '@/shared';

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
  };

  return (
    <WeatherPaginationInfoContext.Provider value={contextValue}>
      {children}
    </WeatherPaginationInfoContext.Provider>
  );
};
