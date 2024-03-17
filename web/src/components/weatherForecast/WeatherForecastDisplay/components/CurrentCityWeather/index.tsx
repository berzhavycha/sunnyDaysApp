'use client';

import { useState, useEffect } from 'react';

import { useCurrentCityWeatherInfo } from '@/context';
import { useDeleteWeatherSubscription, useWeatherData } from '@/hooks';
import { NoData, Spinner } from '@/components';
import { TodayWeatherInfo, Forecast } from './components';
import { useCurrentWeatherTime } from './hooks';

export const CurrentCityWeather = (): JSX.Element => {
  const { data, error } = useWeatherData();
  const { currentCityWeatherInfo } = useCurrentCityWeatherInfo();
  const { deleteSubscription } = useDeleteWeatherSubscription();
  const { dayOfWeek, time } = useCurrentWeatherTime(currentCityWeatherInfo);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (data || error) {
      setIsLoading(false);
    }
  }, [data, error]);

  const onDelete = async (): Promise<void> =>
    await deleteSubscription(currentCityWeatherInfo?.info.city ?? '');

  return (
    <div className="w-1/4 flex flex-col gap-5 bg-blue-800 rounded-3xl p-5">
      {!currentCityWeatherInfo?.info || isLoading ? (
        <Spinner />
      ) :
        !data || !data.userCitiesWeather || !data.userCitiesWeather.edges.length ? (
          <NoData />
        ) : (
          <>
            <TodayWeatherInfo {...currentCityWeatherInfo.info} dayOfWeek={dayOfWeek} time={time} />
            <Forecast info={currentCityWeatherInfo.info.daysForecast ?? []} />
            <button
              onClick={onDelete}
              className="text-center border border-red-500 w-full rounded-xl text-red-400 p-2 transition hover:bg-red-500 hover:text-white"
            >
              Delete City
            </button>
          </>
        )}
    </div>
  );
};
