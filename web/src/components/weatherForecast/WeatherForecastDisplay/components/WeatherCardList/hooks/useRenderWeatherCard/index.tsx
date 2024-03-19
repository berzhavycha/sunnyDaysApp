import { WeatherForecast } from '@/hooks';
import { useCurrentCityWeatherInfo } from '@/context';
import { WeatherCard } from '../../components';

type HookReturn = {
  renderItem(props: WeatherForecast): JSX.Element;
};

export const useRenderWeatherCard = (): HookReturn => {
  const { setCurrentCityWeatherInfo, setShownWeatherInfo, setIsVisible } =
    useCurrentCityWeatherInfo();

  function renderItem(props: WeatherForecast): JSX.Element {
    const onClick = (): void => {
      setShownWeatherInfo(props);
      setCurrentCityWeatherInfo({ info: props });
      setIsVisible(true);
    };

    return <WeatherCard {...props} onClick={onClick} />;
  }

  return { renderItem };
};
