import { useCurrentCityWeatherInfo } from '@/context';
import { WeatherForecastDays } from '@/hooks';
import { ForecastItem } from '../../../ForecastItem';

type HookReturn = {
  renderItem(props: WeatherForecastDays): JSX.Element;
};

export const useRenderForecastItem = (): HookReturn => {
  const { setCurrentCityWeatherInfo, setIsTodayCurrentWeather, setCurrentForecastDay } = useCurrentCityWeatherInfo();

  function renderItem(props: WeatherForecastDays): JSX.Element {
    const onForecastItemClick = (): void => {
      setIsTodayCurrentWeather(false);
      setCurrentForecastDay(props.dayOfWeek)

      setCurrentCityWeatherInfo((prev) => {
        if (prev) {

          return {
            info: {
              ...prev.info,
              ...props,
            },
          };
        }
      });
    };

    return <ForecastItem {...props} onClick={onForecastItemClick} />;
  }

  return { renderItem };
};
