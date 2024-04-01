'use client';

import { useQuery } from '@apollo/client';

import { env } from '@/core/env';
import { getFetchPolicyForKey, ONE_MINUTE } from '@/shared';

import { CitySearchStatusDocument } from './queries';

type HookReturn = {
  isEnabled: boolean;
};

export const useCitySearchStatus = (): HookReturn => {
  const { data } = useQuery(CitySearchStatusDocument, {
    fetchPolicy: getFetchPolicyForKey(
      'citySearchStatus',
      ONE_MINUTE * env.FEATURE_CACHE_MINUTES_TIME,
    ),
    errorPolicy: 'all',
  });

  return {
    isEnabled: data?.citySearchStatus ?? false,
  };
};
