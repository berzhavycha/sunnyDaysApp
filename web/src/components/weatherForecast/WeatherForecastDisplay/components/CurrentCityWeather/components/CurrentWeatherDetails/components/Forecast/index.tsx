import { FC, memo } from 'react';

import { CustomFlatList } from '@/components';
import { useCurrentCityWeatherInfo } from '@/context';
import { env } from '@/core/env';
import { WeatherForecastDays } from '@/shared';

import './style/index.css';
import { InteractiveForecastItems } from '../InteractiveForecastItem';

type Props = {
  info: WeatherForecastDays[];
};

export const Forecast: FC<Props> = memo(({ info }) => {
  const { onTodayCurrentWeather, isTodayCurrentWeather } = useCurrentCityWeatherInfo();

  const isScrollable =
    env.NEXT_PUBLIC_MAX_FORECAST_DAYS !== env.NEXT_PUBLIC_FORECAST_DAYS_PER_SLIDE;

  const keyExtractor = (item: { dayOfWeek: string }): string => item.dayOfWeek;

  return (
    <div className="bg-blue-600 rounded-3xl py-2 px-2 h-full sm:pt-4 sm:py-2 sm:px-3">
      <div className="flex items-center justify-between h-8 mb-1 sm:mb-2 md:mb-4 md:max-lg:mb-1">
        <p className="text-white font-bold text-sm pl-3 md:text-lg">Forecast</p>
        {!isTodayCurrentWeather && (
          <button
            onClick={onTodayCurrentWeather}
            className="bg-blue-800 text-white text-xs px-4 py-1 rounded-xl mr-2 md:text-sm md:px-2 lg:px-4"
          >
            Get Today`s Forecast
          </button>
        )}
      </div>
      <CustomFlatList
        data={info}
        renderItem={InteractiveForecastItems}
        className={`custom-scroll ${isScrollable && 'pr-3'} flex flex-col justify-between h-64 overflow-scroll md:gap-1 lg:gap-2`}
        keyExtractor={keyExtractor}
      />
    </div>
  );
});
