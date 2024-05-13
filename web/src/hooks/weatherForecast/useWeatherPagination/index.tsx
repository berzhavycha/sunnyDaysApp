'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { usePagination } from '@/hooks/common';
import { UserCitiesWeatherQuery } from '@/services';
import { countTotalPages, extractPaginationParams, PaginationQueryOptionsState } from '@/shared';

export type OnPrefetch = (variables: Partial<PaginationQueryOptionsState>) => Promise<void>;

type HookReturn = {
  onClickPrev: () => Promise<void>;
  onClickNext: () => Promise<void>;
  onGoToPage: (page: number) => Promise<void>;
  onPrefetch: OnPrefetch;
};

export const useWeatherPagination = (weatherData?: UserCitiesWeatherQuery): HookReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { page, ...paginationOptions } = extractPaginationParams(searchParams);

  const { onGoToPage, onClickNext, onClickPrev } = usePagination({
    paginationOptions,
    currentPage: page,
    totalPages: countTotalPages(weatherData?.userCitiesWeather, paginationOptions),
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
