'use client';

import { useQuery } from '@apollo/client';

import { getFetchPolicyForKey, ONE_MINUTE } from '@/utils';
import { CitySearchStatusDocument } from './queries';
import { FEATURE_CACHE_MINUTES_TIME } from '@/global';

type HookReturn = {
  isEnabled: boolean;
};

export const useCitySearchStatus = (): HookReturn => {
  const { data } = useQuery(CitySearchStatusDocument, {
    fetchPolicy: getFetchPolicyForKey('citySearchStatus', ONE_MINUTE * FEATURE_CACHE_MINUTES_TIME),
  });

  return {
    isEnabled: data?.citySearchStatus ?? false,
  };
};
