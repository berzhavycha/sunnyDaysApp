import { PaginationQueryOptionsState } from '@/shared/types';

import { extractPaginationParams } from './extractPaginationParams';

// GitHub issue - https://github.com/vercel/next.js/issues/49757#issuecomment-1894910792
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { headers } = require('next/headers');

type PaginationReturn = {
  page: number;
  paginationOptions: PaginationQueryOptionsState;
};

export const getPaginationParams = (): PaginationReturn => {
  const url = new URL(headers().get('x-url'));
  const searchParams = url.searchParams;

  const { page, offset, limit, order } = extractPaginationParams(searchParams);

  const paginationOptions: PaginationQueryOptionsState = {
    offset,
    limit,
    order,
  };

  return {
    page,
    paginationOptions,
  };
};
