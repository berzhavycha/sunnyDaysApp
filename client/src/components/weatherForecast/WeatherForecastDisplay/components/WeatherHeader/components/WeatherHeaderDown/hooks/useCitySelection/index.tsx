import { ListItem } from '@/components/common';
import { City } from '@/hooks';

type RenderCityItemProps = {
  item: City;
};

type UseCitySelectionReturn = {
  renderCityItem: (args: RenderCityItemProps) => JSX.Element;
};

export const useCitySelection = (onCitySelect: (text: string) => void): UseCitySelectionReturn => {
  const handleCitySelect = (selectedCity: string): void => {
    onCitySelect(selectedCity);
  };

  const renderCityItem = ({ item }: RenderCityItemProps): JSX.Element => (
    <ListItem content={item.name} onItemClick={handleCitySelect} />
  );

  return { renderCityItem };
};
