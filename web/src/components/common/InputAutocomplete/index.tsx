import {
  faLocationPin,
  faLocationPinLock,
  faMapLocation,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { Input } from '../Input';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot';

type Props<TItem> = {
  loading: boolean;
  data: TItem[];
  search: string;
  onSearchChange: (text: string) => void;
  placeholder: string;
  error: string;
  onPressOutside: () => void;
  onInputFocus: () => void;
  isAutocompleteShown: boolean;
  isAutocompleteEnabled?: boolean;
};

export const InputAutocomplete = <TItem,>({
  loading,
  data,
  search,
  onSearchChange,
  placeholder,
  error,
  onPressOutside,
  onInputFocus,
  isAutocompleteShown,
  isAutocompleteEnabled,
}: Props<TItem>): JSX.Element => {
  return (
    <div className="relative w-full">
      <Input
        value={search}
        onChange={() => onSearchChange(search)}
        placeholder={placeholder}
        icon={faSearch}
        error={error}
        onFocus={onInputFocus}
      />
      {!loading && data && isAutocompleteShown && isAutocompleteEnabled && (
        <div className="absolute top-14 bg-white w-full z-10 rounded-xl">
          {data.map((item) => {
            return (
              <div
                key={item as string}
                className="text-black py-3 px-4 flex gap-2 items-center hover:bg-gray-200"
              >
                <FontAwesomeIcon className="text-blue-600" icon={faLocationPin} />
                <div className="flex">
                  <div className="main">{item as string}</div>
                  <div className="text-gray-400"> , Ukraine</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
