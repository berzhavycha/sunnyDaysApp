import { WeatherForecast } from '@/hooks';
import { useCurrentCityWeatherInfo } from '@/context';
import { WeatherCard } from '../../components';

type HookReturn = {
  renderItem(props: WeatherForecast): JSX.Element;
};

export const useRenderWeatherCard = (): HookReturn => {
  const { setCurrentCityWeatherInfo, setTodayWeatherCityInfo } = useCurrentCityWeatherInfo();

  function renderItem(props: WeatherForecast): JSX.Element {
    const onClick = (): void => {
      setTodayWeatherCityInfo(props);
      setCurrentCityWeatherInfo({ info: props });
    };

    return <WeatherCard {...props} onClick={onClick} />;
  }

  return { renderItem };
};
