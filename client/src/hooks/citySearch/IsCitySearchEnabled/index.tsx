import { useQuery } from '@apollo/client';

import { CitySearchStatusDocument } from './queries';
import { getFetchPolicyForKey, ONE_MINUTE } from '@/utils/getFetchPolicyForKey';
import { Env } from '@/env';

type HookReturn = {
    isEnabled?: boolean
};

export const useCitySearchStatus = (): HookReturn => {
    const { data } = useQuery(CitySearchStatusDocument, {
        fetchPolicy: getFetchPolicyForKey(
            'citySearchStatus',
            ONE_MINUTE * Env.FEATURE_CACHE_MINUTES_TIME,
        ),
    })

    return {
        isEnabled: data?.citySearchStatus
    };
};
