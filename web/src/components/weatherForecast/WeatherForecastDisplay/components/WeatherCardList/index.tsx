'use client';

import { useWeatherPaginationInfo } from '@/context';
import { useIsLoading, useWeatherData, useWeatherPagination } from '@/hooks';
import { START_PAGE_NUMBER } from '@/shared';
import { CustomFlatList, NoData, PaginationButtonsPanel, Spinner } from '@/components/common';
import { useRenderWeatherCard } from './hooks';

export const WeatherCardList = (): JSX.Element => {
  const { data, error } = useWeatherData();
  const { renderItem } = useRenderWeatherCard();
  const { totalPages, paginationPageNumbers, currentPage, paginationOptions } = useWeatherPaginationInfo();
  const { onGoToPage, onClickNext, onClickPrev, onPrefetch } = useWeatherPagination();
  const { loading } = useIsLoading(data, error);

  const listFooterComponent =
    totalPages > 1 ? (
      <PaginationButtonsPanel
        paginationOptions={paginationOptions}
        startPageNumber={START_PAGE_NUMBER}
        currentPage={currentPage}
        paginationPageNumbers={paginationPageNumbers}
        totalPages={totalPages}
        onGoToPage={onGoToPage}
        onClickNext={onClickNext}
        onClickPrev={onClickPrev}
        onPrefetch={onPrefetch}
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
