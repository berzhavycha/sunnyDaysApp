'use client';

import { useQuery } from '@apollo/client';

import { ONE_MINUTE, getFetchPolicyForKey } from '@/shared';
import { FEATURE_CACHE_MINUTES_TIME } from '@/global';
import { CitySearchStatusDocument } from './queries';

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