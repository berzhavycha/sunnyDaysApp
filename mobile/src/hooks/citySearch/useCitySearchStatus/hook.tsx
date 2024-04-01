import { useQuery } from '@apollo/client';

import { Env } from '@/env';
import { getFetchPolicyForKey, ONE_MINUTE } from '@/shared';

import { CitySearchStatusDocument } from './queries';

type HookReturn = {
  isEnabled: boolean;
};

export const useCitySearchStatus = (): HookReturn => {
  const { data } = useQuery(CitySearchStatusDocument, {
    fetchPolicy: getFetchPolicyForKey(
      'citySearchStatus',
      ONE_MINUTE * Env.FEATURE_CACHE_MINUTES_TIME,
    ),
  });

  return {
    isEnabled: data?.citySearchStatus ?? false,
  };
};
