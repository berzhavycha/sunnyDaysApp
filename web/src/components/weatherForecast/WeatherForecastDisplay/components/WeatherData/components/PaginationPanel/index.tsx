'use client';

import { FC } from 'react';

import { PaginationButtonsPanel } from '@/components/common';
import { useWeatherCardsList, useWeatherPaginationInfo } from '@/context';
import { usePaginationPrefetch, useWeatherPagination } from '@/hooks';
import { START_PAGE_NUMBER, countTotalPages } from '@/shared';

type Props = {
  paginationPageNumbers: number[];
};

export const PaginationPanel: FC<Props> = ({ paginationPageNumbers }) => {
  const { weatherData } = useWeatherCardsList()
  const { currentPage, paginationOptions } = useWeatherPaginationInfo();
  const { onGoToPage, onClickNext, onClickPrev, onPrefetch } = useWeatherPagination();

  const totalPages = countTotalPages(weatherData?.userCitiesWeather, paginationOptions)

  const { onPrevPrefetch, onNextPrefetch, onGoToPagePrefetch } = usePaginationPrefetch({
    currentPage,
    paginationOptions,
    totalPages,
    onPrefetch,
    startPageNumber: START_PAGE_NUMBER,
  });

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
  );
};
