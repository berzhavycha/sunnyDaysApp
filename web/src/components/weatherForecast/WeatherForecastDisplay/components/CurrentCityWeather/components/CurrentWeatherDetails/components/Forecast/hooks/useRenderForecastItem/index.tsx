import { useCurrentCityWeatherInfo } from '@/context';
import { WeatherForecastDays } from '@/shared';

import { ForecastItem } from '../../../ForecastItem';

type HookReturn = {
  renderItem(props: WeatherForecastDays): JSX.Element;
};

export const useRenderForecastItem = (): HookReturn => {
  const { setCurrentCityWeatherInfo, setIsTodayCurrentWeather, setCurrentForecastDay } =
    useCurrentCityWeatherInfo();

  function renderItem(props: WeatherForecastDays): JSX.Element {
    const onForecastItemClick = (): void => {
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
    };

    return <ForecastItem {...props} onClick={onForecastItemClick} />;
  }

  return { renderItem };
};
