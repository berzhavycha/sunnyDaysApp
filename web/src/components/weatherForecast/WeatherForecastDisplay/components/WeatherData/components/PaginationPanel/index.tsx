'use client';

import { FC } from 'react';

import { PaginationButtonsPanel } from '@/components/common';
import { useWeatherCardsList } from '@/context';
import { usePaginationPrefetch, useWeatherPagination } from '@/hooks';
import { START_PAGE_NUMBER, countTotalPages, extractPaginationParams } from '@/shared';
import { useSearchParams } from 'next/navigation';

type Props = {
  paginationPageNumbers: number[];
};

export const PaginationPanel: FC<Props> = ({ paginationPageNumbers }) => {
  const { weatherData } = useWeatherCardsList()
  const searchParams = useSearchParams()
  const { page, ...paginationOptions } = extractPaginationParams(searchParams)
  const { onGoToPage, onClickNext, onClickPrev, onPrefetch } = useWeatherPagination();

  const totalPages = countTotalPages(weatherData?.userCitiesWeather, paginationOptions)

  const { onPrevPrefetch, onNextPrefetch, onGoToPagePrefetch } = usePaginationPrefetch({
    currentPage: page,
    paginationOptions,
    totalPages,
    onPrefetch,
    startPageNumber: START_PAGE_NUMBER,
  });

  return (
    <PaginationButtonsPanel
      startPageNumber={START_PAGE_NUMBER}
      currentPage={page}
      paginationPageNumbers={paginationPageNumbers}
      totalPages={totalPages}
      onGoToPage={onGoToPage}
      onClickNext={onClickNext}
      onClickPrev={onClickPrev}
      onGoToPagePrefetch={onGoToPagePrefetch}
      onNextPrefetch={onNextPrefetch}
      onPrevPrefetch={onPrevPrefetch}
    />
  );
};
