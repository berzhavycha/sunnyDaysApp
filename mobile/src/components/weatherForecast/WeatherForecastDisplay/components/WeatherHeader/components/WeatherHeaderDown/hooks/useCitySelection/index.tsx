import { ListItem } from '@/components/common';
import { useCitySearchList } from '@/context';
import { City } from '@/hooks';

type RenderCityItemProps = {
  item: City;
};

type HookReturn = {
  renderCityItem: (args: RenderCityItemProps) => JSX.Element;
};

export const useCitySelection = (onCitySelect: (text: string) => Promise<void>): HookReturn => {
  const { onPressOutside } = useCitySearchList();

  const renderCityItem = ({ item }: RenderCityItemProps): JSX.Element => {
    const citySelectHandler = async (): Promise<void> => {
      await onCitySelect(item.name);
      onPressOutside();
    };

    return <ListItem content={item.name} onItemClick={citySelectHandler} />;
  };

  return { renderCityItem };
};
