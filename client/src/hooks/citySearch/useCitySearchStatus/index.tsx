import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { Env } from '@/env';
import { getFetchPolicyForKey, ONE_MINUTE } from '@/utils';
import { CitySearchStatusDocument } from './queries';

type HookReturn = {
  isEnabled: boolean;
};

export const useCitySearchStatus = (): HookReturn => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false)

  const { data, loading } = useQuery(CitySearchStatusDocument, {
    fetchPolicy: getFetchPolicyForKey(
      'citySearchStatus',
      ONE_MINUTE * Env.FEATURE_CACHE_MINUTES_TIME,
    ),
  });

  useEffect(() => {
    if (data) {
      setIsEnabled(data.citySearchStatus)
    }
  }, [data, loading])

  return {
    isEnabled,
  };
};
