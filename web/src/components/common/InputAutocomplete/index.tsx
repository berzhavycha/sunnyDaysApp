'use client'

import React, { ChangeEvent, useRef } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Input } from '../Input';
import { CustomFlatList } from '../CustomFlatList';
import { useOutsideClick } from './hooks';

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
  const autocompleteRef = useRef<HTMLDivElement>(null);

  useOutsideClick(autocompleteRef, onPressOutside)
  const onChange = (e: ChangeEvent<HTMLInputElement>): void => onSearchChange(e.target.value);

  return (
    <div className="relative w-full" ref={autocompleteRef}>
      <Input
        value={search}
        onChange={onChange}
        placeholder={placeholder}
        icon={faSearch}
        error={error}
        onFocus={onInputFocus}
      />
      {!loading && data && isAutocompleteShown && isAutocompleteEnabled && (
        <div className="absolute top-14 bg-white w-full z-10 rounded-xl overflow-hidden">
          <CustomFlatList className='flex flex-col' data={data} renderItem={onRenderItem} />
        </div>
      )}
    </div>
  );
};
