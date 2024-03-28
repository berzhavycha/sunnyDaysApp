import { useWeatherCardsList } from '@/context';
import { WeatherForecast } from '@/hooks';
import { SwipeableWeatherCard } from '../../../SwipeableWeatherCard';

type RenderItemProps = {
  item: WeatherForecast;
};

type HookReturn = {
  renderItem(props: RenderItemProps): JSX.Element;
};

export const useRenderWeatherCard = (): HookReturn => {
  const { setIsDeleting, setCityToDelete } = useWeatherCardsList()

  function renderItem({ item }: RenderItemProps): JSX.Element {
    const onDelete = (): void => {
      setIsDeleting(true)
      setCityToDelete(item.city)
    };

    return <SwipeableWeatherCard item={item} onDelete={onDelete} />;
  }

  return { renderItem };
};
