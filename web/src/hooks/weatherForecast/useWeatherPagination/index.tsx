import { useServerPagination } from '@/hooks';
import { PaginationQueryOptionsState } from '@/shared';

import { useWeatherPaginationInfo } from '@/context';

export type OnPrefetch = (variables: Partial<PaginationQueryOptionsState>) => Promise<void>;

type HookReturn = {
  onClickPrev: () => Promise<void>;
  onClickNext: () => Promise<void>;
  onGoToPage: (page: number) => Promise<void>;
  onPrefetch: OnPrefetch;
};

export const useWeatherPagination = (): HookReturn => {
  const { totalPages, currentPage, paginationOptions, updatePaginationOptions } =
    useWeatherPaginationInfo();

  const { onGoToPage, onClickNext, onClickPrev, onPrefetch } = useServerPagination({
    paginationOptions,
    updatePaginationOptions,
    currentPage,
    totalPages,
  });

  const onWeatherPagePrefetch = async (
    variables: Partial<PaginationQueryOptionsState>,
  ): Promise<void> => {
    await onPrefetch(
      {
        ...paginationOptions,
        ...variables,
      },
    );
  };

  return {
    onClickPrev,
    onClickNext,
    onGoToPage,
    onPrefetch: onWeatherPagePrefetch,
  };
};
