'use client';

import { ApolloError } from '@apollo/client';
import { useEffect, useState } from 'react';

type HookReturn = {
    loading: boolean;
};

export const useIsLoading = <TData,>(data: TData, error?: ApolloError): HookReturn => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (data || error) {
            setLoading(false);
        }
    }, [data, error]);

    return { loading }
};
