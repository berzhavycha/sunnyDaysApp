import { ListItem } from '@/components/common';
import { Dispatch, SetStateAction, memo } from 'react';
import { City } from '../../types';

type RenderCityItemProps = {
  item: City;
};

type UseCitySelectionReturn = {
  renderCityItem: (args: RenderCityItemProps) => JSX.Element;
};

export const useCitySelection = (
  setCity: Dispatch<SetStateAction<string>>,
): UseCitySelectionReturn => {
  const handleCitySelect = (selectedCity: string): void => {
    setCity(selectedCity);
  };

  const MemoizedCityItem = memo(({ item }: RenderCityItemProps) => (
    <ListItem content={item.node.name} onItemClick={handleCitySelect} />
  ));

  const renderCityItem = ({ item }: RenderCityItemProps): JSX.Element => (
    <MemoizedCityItem item={item} />
  );

  return { renderCityItem };
};
