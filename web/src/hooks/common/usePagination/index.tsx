import { PaginationQueryOptionsState, START_PAGE_NUMBER } from '@/shared';

interface HookReturn {
  onClickPrev: () => Promise<void>;
  onClickNext: () => Promise<void>;
  onGoToPage: (page: number) => Promise<void>;
}

interface UsePaginationDependencies<TVariables> {
  currentPage: number;
  totalPages: number;
  paginationOptions: PaginationQueryOptionsState;
  updatePaginationOptions: (newOptions: Partial<PaginationQueryOptionsState | TVariables>) => void;
}

export const usePagination = <TVariables,>({
  paginationOptions,
  updatePaginationOptions,
  currentPage,
  totalPages,
}: UsePaginationDependencies<TVariables>): HookReturn => {
  const onClickPrev = async (): Promise<void> => {
    if (currentPage !== START_PAGE_NUMBER) {
      updatePaginationOptions({
        offset: paginationOptions.offset - paginationOptions.limit,
      });
    }
  };

  const onClickNext = async (): Promise<void> => {
    if (currentPage !== totalPages) {
      updatePaginationOptions({
        offset: paginationOptions.offset + paginationOptions.limit,
      });
    }
  };

  const onGoToPage = async (page: number): Promise<void> => {
    updatePaginationOptions({
      offset: (page - 1) * paginationOptions.limit,
    });
  };

  return { onClickPrev, onClickNext, onGoToPage };
};
