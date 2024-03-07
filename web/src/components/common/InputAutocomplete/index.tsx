import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Input } from '../Input';
import { CustomFlatList } from '../CustomFlatList';

type Props<TItem> = {
  loading: boolean;
  data: TItem[];
  search: string;
  onRenderItem: (item: TItem) => JSX.Element;
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
  onRenderItem
}: Props<TItem>): JSX.Element => {
  return (
    <div className="relative w-full">
      <Input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        icon={faSearch}
        error={error}
        onFocus={onInputFocus}
        onBlur={onPressOutside}
      />
      {!loading && data && isAutocompleteShown && isAutocompleteEnabled && (
        <div className="absolute top-14 bg-white w-full z-10 rounded-xl overflow-hidden">
          <CustomFlatList data={data} renderItem={onRenderItem} />
        </div>
      )}
    </div>
  );
};
