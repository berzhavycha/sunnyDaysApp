import { useCitySearchList } from '@/context';
import { City } from '@/hooks';
import { CityAutocompleteItem } from '../../components';

type HookReturn = {
  renderCityItem: (args: City) => JSX.Element;
};

export const useRenderCityItem = (onCitySelect: (text: string) => Promise<void>): HookReturn => {
  const { onPressOutside } = useCitySearchList();

  const renderCityItem = (item: City): JSX.Element => {
    const citySelectHandler = async (): Promise<void> => {
      await onCitySelect(item.name);
      onPressOutside();
    };

    return (
      <CityAutocompleteItem name={item.name} country={item.country} onClick={citySelectHandler} />
    );
  };

  return { renderCityItem };
};
