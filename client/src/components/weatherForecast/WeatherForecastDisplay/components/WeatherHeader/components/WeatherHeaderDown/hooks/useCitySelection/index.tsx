import { memo } from 'react';

import { ListItem } from '@/components/common';
import { City } from '../../types';

type RenderCityItemProps = {
  item: City;
};

type UseCitySelectionReturn = {
  renderCityItem: (args: RenderCityItemProps) => JSX.Element;
};

export const useCitySelection = (
  onCitySelect: (text: string) => void,
): UseCitySelectionReturn => {
  const handleCitySelect = (selectedCity: string): void => {
    onCitySelect(selectedCity);
  };

  const MemoizedCityItem = memo(({ item }: RenderCityItemProps) => (
    <ListItem content={item.node.name} onItemClick={handleCitySelect} />
  ));

  const renderCityItem = ({ item }: RenderCityItemProps): JSX.Element => (
    <MemoizedCityItem item={item} />
  );

  return { renderCityItem };
};
