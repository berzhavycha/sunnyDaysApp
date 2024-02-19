import { useQuery } from '@apollo/client';

import { CitySearchStatusDocument } from './queries';

type HookReturn = {
    isEnabled?: boolean
};

export const useCitySearchStatus = (): HookReturn => {
    const { data } = useQuery(CitySearchStatusDocument)

    return {
        isEnabled: data?.citySearchStatus
    };
};
