import { WeatherForecast } from '@/hooks';
import { WeatherCard } from '../../components';

type HookReturn = {
  renderItem(props: WeatherForecast): JSX.Element;
};

export const useRenderWeatherCard = (): HookReturn => {
  function renderItem(props: WeatherForecast): JSX.Element {
    return <WeatherCard {...props} />;
  }

  return { renderItem };
};
