import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

type Props = {
  name: string;
  country: string;
  onPressOutside: () => void,
  onCitySelect: (text: string) => Promise<void> | void,
};

export const CityAutocompleteItem: FC<Props> = ({ name, country, onPressOutside, onCitySelect }) => {
  const citySelectHandler = async (): Promise<void> => {
    await onCitySelect(name);
    onPressOutside();
  };

  return (
    <div
      className="text-xs text-black py-3 px-4 flex gap-2 items-center transition-colors duration-300 hover:bg-gray-200 cursor-pointer sm:text-base"
      onClick={citySelectHandler}
    >
      <FontAwesomeIcon className="text-blue-600" icon={faLocationPin} />
      <div className="flex">
        <p className="main">{name}</p>
        <p className="text-gray-400">, {country}</p>
      </div>
    </div>
  );
};
