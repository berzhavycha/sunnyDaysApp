import { FC } from 'react';
import { FlatList } from 'react-native';

import { useWeatherData, useWeatherPagination } from '@/hooks';
import { useWeatherPaginationInfo } from '@/context';
import { NoData, PaginationButtons } from '@/components/common';
import { START_PAGE_NUMBER } from '@/shared';
import { SpinnerView } from '../SpinnerView';
import { useRenderWeatherCard } from './hooks';

export const WeatherCardsList: FC = () => {
  const { data, loading } = useWeatherData();
  const { renderItem } = useRenderWeatherCard();
  const { onGoToPage, onClickNext, onClickPrev } = useWeatherPagination();
  const { totalPages, paginationPageNumbers, currentPage } = useWeatherPaginationInfo();

  const keyExtractor = (item: { city: string }): string => item.city;

  const listFooterComponent =
    totalPages > 1 ? (
      <PaginationButtons
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
    <>
      {loading ? (
        <SpinnerView />
      ) : !data?.userCitiesWeather.edges?.length ? (
        <NoData message="No weather information available" />
      ) : (
        <FlatList
          className="w-full"
          data={data.userCitiesWeather.edges}
          keyExtractor={keyExtractor}
          ListFooterComponent={listFooterComponent}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
};
