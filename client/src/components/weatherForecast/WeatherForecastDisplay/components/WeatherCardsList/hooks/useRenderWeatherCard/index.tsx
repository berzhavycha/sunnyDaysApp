import { useDeleteWeatherSubscription } from '@/hooks';
import { WeatherCardProps } from '../../../SwipeableWeatherCard/components';
import { SwipeableWeatherCard } from '../../../SwipeableWeatherCard';

type RenderItemProps = {
  item: WeatherCardProps;
};

type RenderWeatherCardReturn = {
  renderItem(props: RenderItemProps): JSX.Element;
};

export const useRenderWeatherCard = (): RenderWeatherCardReturn => {
  const { deleteSubscriptionHandler } = useDeleteWeatherSubscription();

  function renderItem({ item }: RenderItemProps): JSX.Element {
    const onDelete = async (): Promise<void> => deleteSubscriptionHandler(item.city);

    return <SwipeableWeatherCard item={item} onDelete={onDelete} />;
  }

  return { renderItem };
};