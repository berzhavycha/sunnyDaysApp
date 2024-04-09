import { env } from '@/core/env';
import { START_PAGE_NUMBER } from '@/shared/constants';
import { PaginationQueryOptionsState } from '@/shared/types';

// GitHub issue - https://github.com/vercel/next.js/issues/49757#issuecomment-1894910792
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { headers } = require('next/headers');

type FetchReturn = {
  page: number;
  paginationOptions: PaginationQueryOptionsState;
};

export const getPaginationParams = (): FetchReturn => {
  const url = new URL(headers().get('x-url'));
  const searchParams = url.searchParams;

  const page = +(searchParams.get('page') ?? START_PAGE_NUMBER);
  const limit = +(searchParams.get('perPage') ?? env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT);
  const order = searchParams.get('order') ?? env.NEXT_PUBLIC_WEATHER_CITIES_ORDER;

  const paginationOptions: PaginationQueryOptionsState = {
    offset: (page - 1) * limit,
    limit,
    order,
  };

  return {
    page,
    paginationOptions,
  };
};
