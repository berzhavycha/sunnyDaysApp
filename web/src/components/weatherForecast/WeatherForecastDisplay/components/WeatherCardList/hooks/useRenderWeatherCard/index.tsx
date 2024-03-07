import { WeatherForecast, useDeleteWeatherSubscription } from '@/hooks';
import { WeatherCard } from '../../components';

type HookReturn = {
  renderItem(props: WeatherForecast): JSX.Element;
};

export const useRenderWeatherCard = (): HookReturn => {
  const { deleteSubscription } = useDeleteWeatherSubscription();

  function renderItem(props: WeatherForecast): JSX.Element {
    const onDelete = async (): Promise<void> => await deleteSubscription(props.city);

    return <WeatherCard {...props} />;
  }

  return { renderItem };
};
