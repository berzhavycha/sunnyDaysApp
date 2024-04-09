import { useCurrentCityWeatherInfo } from '@/context';
import { WeatherForecast } from '@/hooks';
import { IS_CLIENT, MD_BREAKPOINT } from '@/shared';

type HookReturn = {
  renderItem(props: WeatherForecast): JSX.Element;
};

export const useRenderWeatherCard = (): HookReturn => {
  const { setCurrentCityWeatherInfo, setShownWeatherInfo, setIsVisibleBelowMedium } =
    useCurrentCityWeatherInfo();

  function renderItem(props: WeatherForecast): JSX.Element {
    const onClick = (): void => {
      setShownWeatherInfo(props);
      setCurrentCityWeatherInfo({ info: props });

      if (IS_CLIENT && window.innerWidth < MD_BREAKPOINT) {
        setIsVisibleBelowMedium(true);
      }
    };

    return <></>;
  }

  return { renderItem };
};
