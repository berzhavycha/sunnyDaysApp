import { OnPrefetch } from "@/hooks";
import { Direction, PaginationQueryOptionsState } from "@/shared";

type Params = {
    paginationOptions: PaginationQueryOptionsState,
    startPageNumber: number;
    currentPage: number;
    totalPages: number;
    onPrefetch?: OnPrefetch
}

type HookReturn = {
    onPrevPrefetch: () => Promise<void>
    onNextPrefetch: () => Promise<void>
    onGoToPagePrefetch: (page: number) => Promise<void>
}

export const usePrefetch = ({ onPrefetch, currentPage, startPageNumber, paginationOptions, totalPages }: Params): HookReturn => {
    const onPrevPrefetch = async (): Promise<void> => {
        if (currentPage !== startPageNumber && onPrefetch) {
            await onPrefetch({ offset: paginationOptions.offset - paginationOptions.limit }, Direction.BACKWARD)
        }
    }

    const onNextPrefetch = async (): Promise<void> => {
        if (currentPage !== totalPages && onPrefetch) {
            await onPrefetch({ offset: paginationOptions.offset + paginationOptions.limit }, Direction.FORWARD)
        }
    }

    const onGoToPagePrefetch = async (page: number): Promise<void> => {
        if (onPrefetch) {
            const offset = (page - 1) * paginationOptions.limit;

            await onPrefetch({ offset }, currentPage < page ? Direction.FORWARD : Direction.BACKWARD);
        }
    }

    return {
        onPrevPrefetch,
        onNextPrefetch,
        onGoToPagePrefetch
    }
}