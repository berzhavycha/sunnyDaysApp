import { FC } from 'react';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  name: string;
  country: string;
  onClick: (city: string) => Promise<void>;
};

export const CityAutocompleteItem: FC<Props> = ({ name, country, onClick }) => {
  const onItemClick = async (): Promise<void> => await onClick(name);

  return (
    <div
      className="text-black py-3 px-4 flex gap-2 items-center transition-colors duration-300 hover:bg-gray-200 cursor-pointer"
      onClick={onItemClick}
    >
      <FontAwesomeIcon className="text-blue-600" icon={faLocationPin} />
      <div className="flex">
        <p className="main">{name}</p>
        <p className="text-gray-400">, {country}</p>
      </div>
    </div>
  );
};
