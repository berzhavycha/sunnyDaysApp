'use client'

import { useRouter } from 'next/navigation';

import { useWeatherPaginationInfo } from '@/context';
import { usePagination } from '@/hooks/common';
import { PaginationQueryOptionsState } from '@/shared';

export type OnPrefetch = (variables: Partial<PaginationQueryOptionsState>) => Promise<void>;

type HookReturn = {
  onClickPrev: () => Promise<void>;
  onClickNext: () => Promise<void>;
  onGoToPage: (page: number) => Promise<void>;
  onPrefetch: OnPrefetch;
};

export const useWeatherPagination = (): HookReturn => {
  const router = useRouter();
  const { totalPages, currentPage, paginationOptions, updatePaginationOptions } =
    useWeatherPaginationInfo();

  const { onGoToPage, onClickNext, onClickPrev } = usePagination({
    paginationOptions,
    updatePaginationOptions,
    currentPage,
    totalPages,
  });

  const onWeatherPagePrefetch = async (
    variables: Partial<PaginationQueryOptionsState>,
  ): Promise<void> => {
    const prefetchPaginationOptions = {
      ...paginationOptions,
      ...variables,
    };

    const page = prefetchPaginationOptions.offset / prefetchPaginationOptions.limit + 1;

    router.prefetch(
      `/weather-forecast?page=${page}&perPage=${prefetchPaginationOptions.limit}&order=${prefetchPaginationOptions.order}`,
    );
  };

  return {
    onClickPrev,
    onClickNext,
    onGoToPage,
    onPrefetch: onWeatherPagePrefetch,
  };
};
