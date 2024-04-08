'use client'

import { PaginationButtonsPanel } from "@/components/common";
import { useWeatherCardsList } from "@/context";
import { useWeatherPagination, usePaginationPrefetch } from "@/hooks";
import { START_PAGE_NUMBER } from "@/shared";
import { FC } from "react";

export const PaginationPanel: FC = () => {
    const { totalPages, paginationPageNumbers, currentPage, paginationOptions } =
        useWeatherCardsList();
    const { onGoToPage, onClickNext, onClickPrev, onPrefetch } = useWeatherPagination();
    const { onPrevPrefetch, onNextPrefetch, onGoToPagePrefetch } = usePaginationPrefetch({
        currentPage,
        paginationOptions,
        totalPages,
        onPrefetch,
        startPageNumber: START_PAGE_NUMBER
    })

    return (
        <PaginationButtonsPanel
            startPageNumber={START_PAGE_NUMBER}
            currentPage={currentPage}
            paginationPageNumbers={paginationPageNumbers}
            totalPages={totalPages}
            onGoToPage={onGoToPage}
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
            onGoToPagePrefetch={onGoToPagePrefetch}
            onNextPrefetch={onNextPrefetch}
            onPrevPrefetch={onPrevPrefetch}
        />
    )
}