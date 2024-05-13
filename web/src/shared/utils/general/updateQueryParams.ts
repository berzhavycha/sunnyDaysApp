import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { SearchParams } from '@/shared/types';

export const updateQueryParams = (
  router: AppRouterInstance,
  newQueryParams: SearchParams,
): void => {
  const current = new URLSearchParams(window.location.search);

  for (const key in newQueryParams) {
    current.set(key, `${newQueryParams[key]}`);
  }

  const search = current.toString();
  const query = search ? `?${search}` : '';

  router.push(`${window.location.pathname}${query}`);
};
