'use client';

import { useRef, useState } from 'react';

import { useCurrentCityWeatherInfo, useWeatherPaginationInfo } from '@/context';
import { IS_CLIENT, MD_BREAKPOINT, START_PAGE_NUMBER } from '@/shared';
import {
  useDeleteWeatherSubscription,
  useIsLoading,
  useOutsideClick,
  usePaginationPrefetch,
  useResizeWindow,
  useWeatherData,
  useWeatherPagination,
} from '@/hooks';
import { NoData, Spinner, ModalBackground, DeleteButton } from '@/components/common';
import { TodayWeatherInfo, Forecast } from './components';
import { useCurrentWeatherTime } from './hooks';

export const CurrentCityWeather = (): JSX.Element => {
  const { data, error } = useWeatherData();
  const { currentCityWeatherInfo, isVisible, setIsVisible } = useCurrentCityWeatherInfo();
  const { deleteSubscription } = useDeleteWeatherSubscription();
  const { dayOfWeek, time } = useCurrentWeatherTime(currentCityWeatherInfo);
  const { loading } = useIsLoading(data, error);
  const { onPrefetch } = useWeatherPagination()
  const { paginationOptions, currentPage, totalPages } = useWeatherPaginationInfo()
  const { onNextPrefetch } = usePaginationPrefetch({
    paginationOptions,
    startPageNumber: START_PAGE_NUMBER,
    currentPage,
    totalPages,
    onPrefetch
  })

  const [windowWidth, setWindowWidth] = useState(IS_CLIENT ? window.innerWidth : 0);
  useResizeWindow(() => setWindowWidth(IS_CLIENT ? window.innerWidth : 0));

  const onCloseCurrentCityWeather = (): void => {
    if (windowWidth <= MD_BREAKPOINT) {
      setIsVisible(false);
    }
  };

  const currentWeatherRef = useRef<HTMLDivElement>(null);
  useOutsideClick(currentWeatherRef, onCloseCurrentCityWeather);

  const onDelete = async (): Promise<void> =>
    await deleteSubscription(currentCityWeatherInfo?.info.city ?? '');


  return (
    <>
      <ModalBackground
        isVisible={isVisible && IS_CLIENT && windowWidth < MD_BREAKPOINT}
        onClose={onCloseCurrentCityWeather}
      />
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
            <DeleteButton text='Delete City' onClick={onDelete} onMouseOver={onNextPrefetch} />
          </>
        )}
      </div>
    </>
  );
};
