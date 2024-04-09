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
import { PaginationQueryOptionsState, START_PAGE_NUMBER } from '@/shared';

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


  const defaultLimit = env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT;
  const defaultOrder = env.NEXT_PUBLIC_WEATHER_CITIES_ORDER;

  const currentPageParam = +(searchParams.get('page') ?? START_PAGE_NUMBER);
  const limitParam = +(searchParams.get('perPage') ?? defaultLimit);
  const orderParam = searchParams.get('order') ?? defaultOrder;
  const offset = (currentPageParam - 1) * limitParam;

  const [currentPage, setCurrentPage] = useState<number>(currentPageParam);
  const [paginationOptions, setPaginationOptions] = useState<PaginationQueryOptionsState>({
    offset,
    limit: limitParam,
    order: orderParam,
  });

  useEffect(() => {
    setPaginationOptions({
      offset,
      limit: limitParam,
      order: orderParam,
    });

  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(currentPageParam);
    const totalPagesRes = Math.ceil(totalCount / paginationOptions.limit);
    setTotalPages(totalPagesRes);
    setPaginationPageNumbers(Array.from({ length: totalPagesRes }, (_, index) => index + 1));
  }, [paginationOptions, totalCount]);

  const updatePaginationOptions = (newOptions: Partial<UserCitiesWeatherQueryVariables>): void => {
    const { offset, limit, ...restOptions } = newOptions;

    const perPage = limit ?? paginationOptions.limit;
    const page = (offset ?? paginationOptions.offset) / perPage + 1;

    const updatedQueryParams = {
      perPage,
      page,
      ...restOptions,
    };

    updateQueryParams(updatedQueryParams);

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
  };

  return (
    <WeatherPaginationInfoContext.Provider value={contextValue}>
      {children}
    </WeatherPaginationInfoContext.Provider>
  );
};
