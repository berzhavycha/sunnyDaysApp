import { City } from '@/shared';

import { CityAutocompleteItem } from '../../../CityAutocompleteItem';

type HookReturn = {
  renderCityItem: (args: City) => JSX.Element;
};

export const useRenderCityItem = (
  onPressOutside: () => void,
  onCitySelect: (text: string) => Promise<void> | void,
): HookReturn => {
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
