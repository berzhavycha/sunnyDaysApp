'use client';

import { useWeatherPaginationQueryOptions } from '@/context';
import { useWeatherData, useWeatherPagination } from '@/hooks';
import { CustomFlatList, NoData, PaginationButtonsPanel } from '@/components/common';
import { START_PAGE_NUMBER } from '@/context/WeatherPaginationOptions/constants';
import { useRenderWeatherCard } from './hooks';

export const WeatherCardList = (): JSX.Element => {
  const { data } = useWeatherData();
  const { renderItem } = useRenderWeatherCard();
  const { totalPages, paginationPageNumbers, currentPage } = useWeatherPaginationQueryOptions();
  const { onGoToPage, onClickNext, onClickPrev } = useWeatherPagination()

  const listFooterComponent =
    totalPages > 1 ? (
      <PaginationButtonsPanel
        startPageNumber={START_PAGE_NUMBER}
        currentPage={currentPage}
        paginationPageNumbers={paginationPageNumbers}
        totalPages={totalPages}
        onClickPageButton={onGoToPage}
        onClickNext={onClickNext}
        onClickPrev={onClickPrev}
      />
    ) : null;

  return (
    <div className="w-full h-full">
      {!data?.userCitiesWeather.edges.length ? (
        <NoData />
      ) : (
        <CustomFlatList
          className="w-full flex flex-wrap gap-6"
          data={data?.userCitiesWeather.edges}
          renderItem={renderItem}
          listFooterComponent={listFooterComponent}
        />
      )}
    </div>
  );
};
