import { FC } from 'react';

import { DeleteButton, NoData, Spinner } from '@/components/common';
import { useCurrentCityWeatherInfo, useWeatherCardsList, useWeatherPaginationInfo } from '@/context';
import { env } from '@/core/env';
import { useIsLoading, usePaginationPrefetch, useWeatherPagination } from '@/hooks';
import { START_PAGE_NUMBER } from '@/shared';

import { Forecast, TodayWeatherInfo } from './components';
import { useCurrentWeatherTime } from './hooks';

type Props = {
  onDelete: (city: string) => void;
};

export const CurrentWeatherDetails: FC<Props> = ({ onDelete }) => {
  const { weatherData } = useWeatherCardsList()
  const { loading } = useIsLoading(weatherData);
  const { currentCityWeatherInfo, isVisibleBelowMedium } = useCurrentCityWeatherInfo();
  const { dayOfWeek, time } = useCurrentWeatherTime(currentCityWeatherInfo);

  const { onPrefetch } = useWeatherPagination();
  const { paginationOptions, currentPage, totalPages, totalCount } = useWeatherPaginationInfo();
  const { onNextPrefetch, onPrevPrefetch } = usePaginationPrefetch({
    paginationOptions,
    startPageNumber: START_PAGE_NUMBER,
    currentPage,
    totalPages,
    onPrefetch,
  });

  const onDeleteCity = (): void => onDelete(currentCityWeatherInfo?.info.city ?? '');

  const onMouseOverDeleteBtn = async (): Promise<void> => {
    if (
      (totalCount - 1) % env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT === 0 &&
      weatherData?.userCitiesWeather.edges?.length === 1
    ) {
      await onPrevPrefetch();
    } else {
      await onNextPrefetch();
    }
  };

  return (
    <div
      className={`${isVisibleBelowMedium ? 'flex' : 'hidden'} md:flex fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col gap-5 bg-blue-800 rounded-3xl p-5 transition-opacity duration-300 z-10 w-4/5 md:flex md:left-8 md:top-8 md:transform md:translate-x-0 md:translate-y-0 md:w-[45%] md:h-[92%] lg:w-2/5 xl:w-1/3 2xl:w-1/4 md:flex`}
    >
      {loading ? (
        <Spinner />
      ) : !currentCityWeatherInfo?.info ? (
        <NoData />
      ) : (
        <>
          <TodayWeatherInfo {...currentCityWeatherInfo.info} dayOfWeek={dayOfWeek} time={time} />
          <Forecast info={currentCityWeatherInfo.info.daysForecast ?? []} />
          <DeleteButton
            text="Delete City"
            onClick={onDeleteCity}
            onMouseOver={onMouseOverDeleteBtn}
          />
        </>
      )}
    </div>
  );
};
