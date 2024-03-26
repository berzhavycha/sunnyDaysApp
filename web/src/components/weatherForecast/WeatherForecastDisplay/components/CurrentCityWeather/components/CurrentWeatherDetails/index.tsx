import { FC, RefObject } from 'react';

import { useCurrentCityWeatherInfo, useWeatherPaginationInfo } from '@/context';
import {
  useWeatherData,
  useIsLoading,
  useDeleteWeatherSubscription,
  useWeatherPagination,
  usePaginationPrefetch,
} from '@/hooks';
import { IS_CLIENT, START_PAGE_NUMBER } from '@/shared';
import { Spinner, NoData, DeleteButton } from '@/components/common';
import { TodayWeatherInfo, Forecast } from './components';
import { useCurrentWeatherTime } from './hooks';

type Props = {
  currentWeatherRef: RefObject<HTMLDivElement>;
};

export const CurrentWeatherDetails: FC<Props> = ({ currentWeatherRef }) => {
  const { data, error } = useWeatherData();
  const { loading } = useIsLoading(data, error);

  const { currentCityWeatherInfo, isVisible } = useCurrentCityWeatherInfo();
  const { dayOfWeek, time } = useCurrentWeatherTime(currentCityWeatherInfo);

  const { deleteSubscription } = useDeleteWeatherSubscription();
  const { onPrefetch } = useWeatherPagination();
  const { paginationOptions, currentPage, totalPages } = useWeatherPaginationInfo();
  const { onNextPrefetch } = usePaginationPrefetch({
    paginationOptions,
    startPageNumber: START_PAGE_NUMBER,
    currentPage,
    totalPages,
    onPrefetch,
  });

  const onDelete = async (): Promise<void> =>
    await deleteSubscription(currentCityWeatherInfo?.info.city ?? '');

  return (
    <div
      ref={currentWeatherRef}
      className={`${isVisible && IS_CLIENT ? 'flex' : 'hidden'} fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col gap-5 bg-blue-800 rounded-3xl p-5 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300 z-10 w-4/5 md:flex md:left-8 md:top-8 md:transform md:translate-x-0 md:translate-y-0 md:w-[45%] md:h-[92%] lg:w-2/5 xl:w-1/3 2xl:w-1/4 md:flex`}
    >
      {loading ? (
        <Spinner />
      ) : !currentCityWeatherInfo?.info ? (
        <NoData />
      ) : (
        <>
          <TodayWeatherInfo {...currentCityWeatherInfo.info} dayOfWeek={dayOfWeek} time={time} />
          <Forecast info={currentCityWeatherInfo.info.daysForecast ?? []} />
          <DeleteButton text="Delete City" onClick={onDelete} onMouseOver={onNextPrefetch} />
        </>
      )}
    </div>
  );
};
