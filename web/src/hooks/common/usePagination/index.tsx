'use client';

import { useRouter } from 'next/navigation';

import { PaginationQueryOptionsState, START_PAGE_NUMBER, updatePaginationOptions } from '@/shared';

interface HookReturn {
  onClickPrev: () => Promise<void>;
  onClickNext: () => Promise<void>;
  onGoToPage: (page: number) => Promise<void>;
}

interface UsePaginationDependencies {
  currentPage: number;
  totalPages: number;
  paginationOptions: PaginationQueryOptionsState;
}

export const usePagination = ({
  paginationOptions,
  currentPage,
  totalPages,
}: UsePaginationDependencies): HookReturn => {
  const router = useRouter();

  const onClickPrev = async (): Promise<void> => {
    if (currentPage !== START_PAGE_NUMBER) {
      updatePaginationOptions(router, paginationOptions, {
        offset: paginationOptions.offset - paginationOptions.limit,
      });
    }
  };

  const onClickNext = async (): Promise<void> => {
    if (currentPage !== totalPages) {
      updatePaginationOptions(router, paginationOptions, {
        offset: paginationOptions.offset + paginationOptions.limit,
      });
    }
  };

  const onGoToPage = async (page: number): Promise<void> => {
    updatePaginationOptions(router, paginationOptions, {
      offset: (page - 1) * paginationOptions.limit,
    });
  };

  return { onClickPrev, onClickNext, onGoToPage };
};
