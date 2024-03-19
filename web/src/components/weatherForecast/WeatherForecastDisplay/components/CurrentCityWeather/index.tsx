'use client';

import { useRef, useState } from 'react';

import { useCurrentCityWeatherInfo } from '@/context';
import { useDeleteWeatherSubscription, useIsLoading, useOutsideClick, useResizeWindow, useWeatherData } from '@/hooks';
import { CloseButton, NoData, Spinner } from '@/components';
import { TodayWeatherInfo, Forecast } from './components';
import { useCurrentWeatherTime } from './hooks';

export const CurrentCityWeather = (): JSX.Element => {
  const { data, error } = useWeatherData();
  const { currentCityWeatherInfo, isVisible, setIsVisible } = useCurrentCityWeatherInfo();
  const { deleteSubscription } = useDeleteWeatherSubscription();
  const { dayOfWeek, time } = useCurrentWeatherTime(currentCityWeatherInfo);
  const { loading } = useIsLoading(data, error);

  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);
  useResizeWindow(() => setWindowWidth(typeof window !== "undefined" ? window.innerWidth : 0))

  const onCloseCurrentCityWeather = (): void => {
    if (windowWidth <= 768) {
      setIsVisible(false)
    }
  }
  const currentWeatherRef = useRef<HTMLDivElement>(null);
  useOutsideClick(currentWeatherRef, onCloseCurrentCityWeather);

  const onDelete = async (): Promise<void> =>
    await deleteSubscription(currentCityWeatherInfo?.info.city ?? '');


  return (
    <>
      {isVisible && windowWidth <= 768 && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 z-10">
          <div className="text-right p-4">
            <CloseButton onClick={onCloseCurrentCityWeather} />
          </div>
        </div>
      )}
      <div ref={currentWeatherRef} className={`fixed flex left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300 z-10 w-4/5 md:left-8 md:top-8 md:transform md:translate-x-0 md:translate-y-0 md:w-[45%] md:h-[92%] lg:w-2/5 xl:w-1/3 2xl:w-1/4 md:flex flex-col gap-5 bg-blue-800 rounded-3xl p-5`}>
        {loading ? (
          <Spinner />
        ) : !currentCityWeatherInfo?.info ? (
          <NoData />
        ) : (
          <>
            <TodayWeatherInfo {...currentCityWeatherInfo.info} dayOfWeek={dayOfWeek} time={time} />
            <Forecast info={currentCityWeatherInfo.info.daysForecast ?? []} />
            <button
              onClick={onDelete}
              className="text-center border border-red-500 w-full rounded-xl text-red-400 p-2 transition-all hover:bg-red-500 hover:text-white"
            >
              Delete City
            </button>
          </>
        )}
      </div>
    </>
  );
};

