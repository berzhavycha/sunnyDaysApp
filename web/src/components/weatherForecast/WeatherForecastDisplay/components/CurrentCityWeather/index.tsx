'use client';

import { useCurrentCityWeatherInfo } from '@/context';
import { useDeleteWeatherSubscription, useIsLoading, useWeatherData } from '@/hooks';
import { NoData, Spinner } from '@/components';
import { TodayWeatherInfo, Forecast } from './components';
import { useCurrentWeatherTime } from './hooks';

export const CurrentCityWeather = (): JSX.Element => {
  const { data, error } = useWeatherData();
  const { currentCityWeatherInfo } = useCurrentCityWeatherInfo();
  const { deleteSubscription } = useDeleteWeatherSubscription();
  const { dayOfWeek, time } = useCurrentWeatherTime(currentCityWeatherInfo);
  const { loading } = useIsLoading(data, error)

  const onDelete = async (): Promise<void> =>
    await deleteSubscription(currentCityWeatherInfo?.info.city ?? '');

  return (
    <div className="w-1/4 flex flex-col gap-5 bg-blue-800 rounded-3xl p-5">
      {loading ? (
        <Spinner />
      ) :
        !data || !data.userCitiesWeather || !data.userCitiesWeather.edges.length || !currentCityWeatherInfo?.info ? (
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
