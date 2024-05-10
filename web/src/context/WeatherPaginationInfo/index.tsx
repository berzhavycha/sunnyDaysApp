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

import { useQueryParams } from '@/hooks';
import { UserCitiesWeatherQueryVariables } from '@/services';
import { extractPaginationParams, PaginationQueryOptionsState } from '@/shared';

import { useSubscriptionError } from '../SubscriptionError';

type ContextType = {
  paginationOptions: PaginationQueryOptionsState;
  setPaginationOptions: Dispatch<SetStateAction<PaginationQueryOptionsState>>;
  updatePaginationOptions: (newOptions: Partial<UserCitiesWeatherQueryVariables>) => void;
  currentPage: number;
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
  const searchParams = useSearchParams();
  const { updateQueryParams } = useQueryParams();

  const { setError } = useSubscriptionError();

  const { page, offset, limit, order } = extractPaginationParams(searchParams);

  const [paginationOptions, setPaginationOptions] = useState<PaginationQueryOptionsState>({
    offset,
    limit,
    order,
  });

  useEffect(() => {
    setPaginationOptions({
      offset,
      limit,
      order,
    });
    setError({ message: '' });
  }, [searchParams]);

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
    currentPage: page,
  };

  return (
    <WeatherPaginationInfoContext.Provider value={contextValue}>
      {children}
    </WeatherPaginationInfoContext.Provider>
  );
};
