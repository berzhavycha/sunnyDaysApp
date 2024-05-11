import { FC, useCallback } from 'react';

import { useCurrentCityWeatherInfo } from '@/context';
import { WeatherForecastDays } from '@/shared';

import { ForecastItem } from '../ForecastItem';

type Props = WeatherForecastDays & {
  currentForecastDay: string;
  setCurrentForecastDay: (day: string) => void;
  setIsTodayCurrentWeather: (state: boolean) => void;
}

export const InteractiveForecastItems: FC<Props> = ({ currentForecastDay, setCurrentForecastDay, setIsTodayCurrentWeather, ...weatherProps }) => {
  const { setCurrentCityWeatherInfo } = useCurrentCityWeatherInfo();

  const onForecastItemClick = useCallback((): void => {
    setIsTodayCurrentWeather(false);
    setCurrentForecastDay(weatherProps.dayOfWeek);

    setCurrentCityWeatherInfo((prev) => {
      return {
        info: {
          ...prev.info,
          ...weatherProps,
        },
      };
    });
  }, [setCurrentCityWeatherInfo]);

  return <ForecastItem {...weatherProps} currentForecastDay={currentForecastDay} onClick={onForecastItemClick} />;
};
