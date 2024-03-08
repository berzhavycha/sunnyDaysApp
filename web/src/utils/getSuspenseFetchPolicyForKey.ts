import { SuspenseQueryHookFetchPolicy } from '@apollo/client';

const keys = new Map<string, number>();

export const getSuspenseFetchPolicyForKey = (key: string, expirationMs: number): SuspenseQueryHookFetchPolicy => {
    const lastFetchTimestamp = keys.get(key);
    const diffFromNow = lastFetchTimestamp
        ? Date.now() - lastFetchTimestamp
        : Number.MAX_SAFE_INTEGER;
    let fetchPolicy: SuspenseQueryHookFetchPolicy = 'cache-first';

    if (diffFromNow > expirationMs) {
        keys.set(key, Date.now());
        fetchPolicy = 'network-only';
    }

    return fetchPolicy;
};
