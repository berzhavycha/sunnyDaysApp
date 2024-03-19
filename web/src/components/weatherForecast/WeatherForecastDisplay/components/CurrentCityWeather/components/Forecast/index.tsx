'use client';

import { FC, memo } from 'react';

import { WeatherForecastDays } from '@/hooks';
import { useCurrentCityWeatherInfo } from '@/context';
import { CustomFlatList } from '@/components';
import { useRenderForecastItem } from './hooks';

type Props = {
  info: WeatherForecastDays[];
};

export const Forecast: FC<Props> = memo(({ info }) => {
  const { onTodayCurrentWeather, isTodayCurrentWeather } = useCurrentCityWeatherInfo();
  const { renderItem } = useRenderForecastItem();

  const keyExtractor = (item: { dayOfWeek: string }): string => item.dayOfWeek;

  return (
    <div className="bg-blue-600 rounded-3xl py-2 px-2 sm:pt-4 sm:py-2 sm:px-3 h-full">
      <div className="flex items-center justify-between mb-1 sm:mb-2 md:mb-4 md:max-lg:mb-1 h-8">
        <p className="text-white font-bold text-sm md:text-lg pl-3">Forecast</p>
        {!isTodayCurrentWeather && (
          <button
            onClick={onTodayCurrentWeather}
            className="bg-blue-800 text-white text-xs px-4 lg:px-4 py-1 rounded-xl mr-2 md:text-sm md:px-2"
          >
            Get Today`s Forecast
          </button>
        )}
      </div>
      <CustomFlatList
        data={info}
        renderItem={renderItem}
        className={'flex flex-col justify-between md:gap-1 lg:gap-3'}
        keyExtractor={keyExtractor}
      />
    </div>
  );
});
