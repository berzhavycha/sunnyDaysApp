import { FC, memo, useState } from 'react';

import { CustomFlatList } from '@/components';
import { useCurrentCityWeatherInfo } from '@/context';
import { env } from '@/core/env';
import { WeatherForecastDays } from '@/shared';

import { InteractiveForecastItems } from '../InteractiveForecastItem';
import { TodaysForecastButton } from '../TodaysForecastButton';

import './style/index.css';

type Props = {
  info: WeatherForecastDays[];
};

export const Forecast: FC<Props> = memo(({ info }) => {
  const { shownWeatherInfo, setCurrentCityWeatherInfo } = useCurrentCityWeatherInfo();

  const [currentForecastDay, setCurrentForecastDay] = useState<string>('');
  const [isTodayCurrentWeather, setIsTodayCurrentWeather] = useState<boolean>(true);


  const onTodayCurrentWeather = (): void => {
    if (shownWeatherInfo) {
      setCurrentForecastDay('');
      setIsTodayCurrentWeather(true);
      setCurrentCityWeatherInfo({ info: shownWeatherInfo });
    }
  };

  const isScrollable =
    env.NEXT_PUBLIC_MAX_FORECAST_DAYS !== env.NEXT_PUBLIC_FORECAST_DAYS_PER_SLIDE;

  const keyExtractor = (item: { dayOfWeek: string }): string => item.dayOfWeek;
  const renderItem = (item: WeatherForecastDays): JSX.Element => <InteractiveForecastItems {...item} currentForecastDay={currentForecastDay} setCurrentForecastDay={setCurrentForecastDay} setIsTodayCurrentWeather={setIsTodayCurrentWeather} />

  return (
    <div className="bg-blue-600 rounded-3xl py-2 px-2 h-full sm:pt-4 sm:py-2 sm:px-3">
      <div className="flex items-center justify-between h-8 mb-1 sm:mb-2 md:mb-4 md:max-lg:mb-1">
        <p className="text-white font-bold text-sm pl-3 md:text-lg">Forecast</p>
        {!isTodayCurrentWeather && <TodaysForecastButton onClick={onTodayCurrentWeather} />}
      </div>
      <CustomFlatList
        data={info}
        renderItem={renderItem}
        className={`custom-scroll ${isScrollable && 'pr-3'} flex flex-col justify-between h-64 overflow-scroll md:gap-1 lg:gap-2`}
        keyExtractor={keyExtractor}
      />
    </div>
  );
});
