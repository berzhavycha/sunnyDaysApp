import {
    PaginationQueryOptionsState,
    START_PAGE_NUMBER,
} from '@/shared';
import { useRouter } from 'next/navigation';

interface HookReturn {
    onClickPrev: () => Promise<void>;
    onClickNext: () => Promise<void>;
    onGoToPage: (page: number) => Promise<void>;
    onPrefetch: (
        variables: PaginationQueryOptionsState,
    ) => Promise<void>;
}

interface UsePaginationDependencies<
    TVariables,
> {
    currentPage: number;
    totalPages: number;
    paginationOptions: PaginationQueryOptionsState;
    updatePaginationOptions: (newOptions: Partial<PaginationQueryOptionsState | TVariables>) => void;
}

export const useServerPagination = <TVariables,>({
    paginationOptions,
    updatePaginationOptions,
    currentPage,
    totalPages,
}: UsePaginationDependencies<TVariables>): HookReturn => {
    const router = useRouter()

    const onClickPrev = async (): Promise<void> => {
        if (currentPage !== START_PAGE_NUMBER) {
            updatePaginationOptions({
                offset: paginationOptions.offset - paginationOptions.limit,
            });
        }
    };

    const onClickNext = async (): Promise<void> => {
        if (currentPage !== totalPages) {
            updatePaginationOptions({
                offset: paginationOptions.offset + paginationOptions.limit,
            });
        }
    }

    const onGoToPage = async (page: number): Promise<void> => {
        updatePaginationOptions({
            offset: (page - 1) * paginationOptions.limit
        });
    };

    const onPrefetch = async (variables: PaginationQueryOptionsState): Promise<void> => {
        router.prefetch(`/weather-forecast?page=${variables.offset}&perPage=${variables.limit}&order=${variables.order}`)
    };

    return { onClickPrev, onClickNext, onGoToPage, onPrefetch };
};
