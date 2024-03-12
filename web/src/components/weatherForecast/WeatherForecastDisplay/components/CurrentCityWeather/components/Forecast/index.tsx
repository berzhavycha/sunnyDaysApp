import { FC } from 'react';

import { WeatherForecastDays } from '@/hooks';
import { useCurrentCityWeatherInfo } from '@/context';
import { CustomFlatList } from '@/components';
import { useRenderForecastItem } from './hooks';

type Props = {
  info: WeatherForecastDays[];
};

export const Forecast: FC<Props> = ({ info }) => {
  const { onTodayCurrentWeather, isTodayCurrentWeather } = useCurrentCityWeatherInfo();
  const { renderItem } = useRenderForecastItem();

  return (
    <div className="bg-blue-600 rounded-3xl pt-4 py-2 px-3 h-full">
      <div className="flex items-center justify-between mb-4 h-8">
        <p className="text-white font-bold text-lg pl-3">Forecast</p>
        {!isTodayCurrentWeather && (
          <button
            onClick={onTodayCurrentWeather}
            className="bg-blue-800 text-white px-4 py-1 rounded-xl mr-2"
          >
            Get Today`s Forecast
          </button>
        )}
      </div>
      <CustomFlatList
        data={info}
        renderItem={renderItem}
        className={'flex flex-col justify-between'}
      />
    </div>
  );
};
