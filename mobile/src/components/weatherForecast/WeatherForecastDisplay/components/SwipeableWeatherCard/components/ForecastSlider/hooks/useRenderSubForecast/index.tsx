import { WeatherForecastDays } from '@/hooks';

import { SubWeatherForecastDay } from '../../../SubWeatherForecastDay';

type HookReturn = {
  renderItem: (props: WeatherForecastDays) => JSX.Element;
};

export const useRenderSubForecast = (): HookReturn => {
  function renderItem(item: WeatherForecastDays): JSX.Element {
    return <SubWeatherForecastDay info={item} />;
  }

  return { renderItem };
};
