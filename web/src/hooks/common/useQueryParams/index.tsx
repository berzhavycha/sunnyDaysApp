'use client'

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type QueryParams = { [key: string]: string | number | boolean }

type HookReturn = {
    queryParams: QueryParams,
    updateQueryParams: (newQueryParams: QueryParams) => void
}

export const useQueryParams = (): HookReturn => {
    const router = useRouter();
    const pathname = usePathname();
    const [queryParams, setQueryParams] = useState<QueryParams>({});

    const searchParams = useSearchParams();

    useEffect(() => {
        setQueryParams(Object.fromEntries(searchParams.entries()));
    }, [searchParams]);

    const updateQueryParams = (newQueryParams: QueryParams): void => {
        const current = new URLSearchParams(searchParams.toString());

        for (const key in newQueryParams) {
            current.set(key, `${newQueryParams[key]}`);
        }

        const search = current.toString();
        const query = search ? `?${search}` : "";

        router.push(`${pathname}${query}`);
    };

    return {
        queryParams,
        updateQueryParams
    };
};
