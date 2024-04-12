import { PaginationQueryOptionsState } from '@/shared/types';

type DataWithPaginationInfo = {
  paginationInfo: {
    totalCount: number;
  };
};

export const countTotalPages = <T extends DataWithPaginationInfo>(
  data: T,
  paginationOptions: PaginationQueryOptionsState,
): number => {
  const totalCount = data?.paginationInfo.totalCount ?? 0;
  return Math.ceil(totalCount / paginationOptions.limit);
};
