import { WeatherForecast, useDeleteWeatherSubscription } from '@/hooks';
import { SwipeableWeatherCard } from '../../../SwipeableWeatherCard';

type RenderItemProps = {
  item: WeatherForecast;
};

type HookReturn = {
  renderItem(props: RenderItemProps): JSX.Element;
};

export const useRenderWeatherCard = (): HookReturn => {
  const { deleteSubscription } = useDeleteWeatherSubscription();

  function renderItem({ item }: RenderItemProps): JSX.Element {
    const onDelete = async (): Promise<void> => await deleteSubscription(item.city);

    return <SwipeableWeatherCard item={item} onDelete={onDelete} />;
  }

  return { renderItem };
};
