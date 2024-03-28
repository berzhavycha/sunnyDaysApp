import { FC } from 'react';
import { FlatList } from 'react-native';

import { useWeatherData, useWeatherPagination } from '@/hooks';
import { useWeatherCardsList, useWeatherPaginationInfo } from '@/context';
import { START_PAGE_NUMBER } from '@/shared';
import { ModalBackground, NoData, PaginationButtons } from '@/components/common';
import { SpinnerView } from '../SpinnerView';
import { useRenderWeatherCard } from './hooks';
import { DeletionModal } from '../DeletionModal';

export const WeatherCardsList: FC = () => {
  const { data, loading } = useWeatherData();
  const { renderItem } = useRenderWeatherCard();
  const { onGoToPage, onClickNext, onClickPrev } = useWeatherPagination();
  const { totalPages, paginationPageNumbers, currentPage } = useWeatherPaginationInfo();
  const { cityToDelete, isDeleting, setIsDeleting } = useWeatherCardsList();

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

  const onDeletionModalClose = (): void => setIsDeleting(false);

  return (
    <>
      {loading ? (
        <SpinnerView />
      ) : !data?.userCitiesWeather.edges?.length ? (
        <NoData message="No weather information available" />
      ) : (
        <>
          <FlatList
            className="w-full"
            data={data.userCitiesWeather.edges}
            keyExtractor={keyExtractor}
            ListFooterComponent={listFooterComponent}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
          <ModalBackground isVisible={isDeleting} onClose={onDeletionModalClose} zIndex={65000}>
            <DeletionModal city={cityToDelete} onClose={onDeletionModalClose} />
          </ModalBackground>
        </>
      )}
    </>
  );
};
