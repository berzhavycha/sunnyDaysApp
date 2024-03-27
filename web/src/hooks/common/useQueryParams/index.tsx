'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type QueryParams = { [key: string]: string | number | boolean };

type HookReturn = {
  updateQueryParams: (newQueryParams: QueryParams) => void;
};

export const useQueryParams = (): HookReturn => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const updateQueryParams = (newQueryParams: QueryParams): void => {
    const current = new URLSearchParams(searchParams.toString());

    for (const key in newQueryParams) {
      current.set(key, `${newQueryParams[key]}`);
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  };

  return {
    updateQueryParams,
  };
};
