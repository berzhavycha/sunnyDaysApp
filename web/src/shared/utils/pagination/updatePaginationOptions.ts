import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { PaginationQueryOptionsState } from '@/shared/types';

import { updateQueryParams } from '../general';

export const updatePaginationOptions = <TOptions extends PaginationQueryOptionsState>(
  router: AppRouterInstance,
  oldOptions: TOptions,
  newOptions: Partial<TOptions>,
): void => {
  const { offset: newOffset, limit: newLimit, ...restOptions } = newOptions;

  const perPage = newLimit ?? oldOptions.limit;
  const page = (newOffset ?? oldOptions.offset) / perPage + 1;

  const updatedQueryParams = {
    perPage,
    page,
    ...restOptions,
  };

  updateQueryParams(router, updatedQueryParams);
};
