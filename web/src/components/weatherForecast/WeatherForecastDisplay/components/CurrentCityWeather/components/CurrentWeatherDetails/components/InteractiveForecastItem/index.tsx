import { FC } from 'react';

import { useCurrentCityWeatherInfo } from '@/context';
import { WeatherForecastDays } from '@/shared';

import { ForecastItem } from '../ForecastItem';

type Props = WeatherForecastDays & {
  currentForecastDay: string;
  setCurrentForecastDay: (day: string) => void;
  setIsTodayCurrentWeather: (state: boolean) => void;
};

export const InteractiveForecastItems: FC<Props> = ({
  currentForecastDay,
  setCurrentForecastDay,
  setIsTodayCurrentWeather,
  ...weatherProps
}) => {
  const { setCurrentCityWeatherInfo } = useCurrentCityWeatherInfo();

  const onForecastItemClick = (): void => {
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
  };

  return (
    <ForecastItem
      {...weatherProps}
      currentForecastDay={currentForecastDay}
      onClick={onForecastItemClick}
    />
  );
};
