'use client';

import { FC } from 'react';

import { CustomFlatList, NoData, PaginationButtonsPanel, Spinner } from '@/components/common';
import { useWeatherCardsList, useWeatherPaginationInfo } from '@/context';
import { useIsLoading, usePaginationPrefetch, useWeatherData, useWeatherPagination } from '@/hooks';
import { START_PAGE_NUMBER } from '@/shared';

import { useRenderWeatherCard } from './hooks';

export const WeatherCardList: FC = () => {
  const { data, error } = useWeatherData();
  const { renderItem } = useRenderWeatherCard();
  const { totalPages, paginationPageNumbers, currentPage, paginationOptions } =
    useWeatherPaginationInfo();
  const { onGoToPage, onClickNext, onClickPrev, onPrefetch } = useWeatherPagination();
  const { onPrevPrefetch, onNextPrefetch, onGoToPagePrefetch } = usePaginationPrefetch({
    currentPage,
    paginationOptions,
    totalPages,
    onPrefetch,
    startPageNumber: START_PAGE_NUMBER
  })
  const { loading } = useIsLoading(data, error);

  const listFooterComponent =
    totalPages > 1 ? (
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
    ) : null;

  const keyExtractor = (item: { city: string }): string => item.city;

  return (
    <div className="w-full h-full">
      {loading ? (
        <Spinner />
      ) : !data || !data.userCitiesWeather || !data?.userCitiesWeather.edges.length ? (
        <NoData />
      ) : (
        <CustomFlatList
          className="w-full flex flex-wrap gap-6 sm:gap-5 xl:gap-4 2xl:gap-5"
          data={data?.userCitiesWeather.edges}
          renderItem={renderItem}
          listFooterComponent={listFooterComponent}
          keyExtractor={keyExtractor}
        />
      )}
    </div>
  );
};
