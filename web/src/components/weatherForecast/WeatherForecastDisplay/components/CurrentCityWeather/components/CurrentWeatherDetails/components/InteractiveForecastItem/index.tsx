import { useCallback } from 'react';

import { useCurrentCityWeatherInfo } from '@/context';
import { WeatherForecastDays } from '@/shared';

import { ForecastItem } from '../ForecastItem';

export const InteractiveForecastItems = (props: WeatherForecastDays): JSX.Element => {
  const { setCurrentCityWeatherInfo, setIsTodayCurrentWeather, setCurrentForecastDay } =
    useCurrentCityWeatherInfo();

  const onForecastItemClick = useCallback((): void => {
    setIsTodayCurrentWeather(false);
    setCurrentForecastDay(props.dayOfWeek);

    setCurrentCityWeatherInfo((prev) => {
      return {
        info: {
          ...prev.info,
          ...props,
        },
      };
    });
  }, [setIsTodayCurrentWeather, setCurrentForecastDay, setCurrentCityWeatherInfo]);

  return <ForecastItem {...props} onClick={onForecastItemClick} />;
};
