'use client'

import React, { ChangeEvent, useRef } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { useOutsideClick } from '@/hooks';
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
  onEnter: () => Promise<void>;
  keyExtractor: (item: TItem) => string;
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
  onRenderItem,
  onEnter,
  keyExtractor,
}: Props<TItem>): JSX.Element => {
  const autocompleteRef = useRef<HTMLDivElement>(null);
  useOutsideClick(autocompleteRef, onPressOutside);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => onSearchChange(e.target.value);
  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (e.key === 'Enter') {
      await onEnter();
    }
  };

  return (
    <div className="relative w-full" ref={autocompleteRef}>
      <Input
        value={search}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        icon={faSearch}
        error={error}
        onFocus={onInputFocus}
      />
      {!loading && data && isAutocompleteShown && isAutocompleteEnabled && (
        <div className="absolute top-14 bg-white w-full z-10 rounded-xl overflow-hidden">
          <CustomFlatList
            className="flex flex-col"
            data={data}
            renderItem={onRenderItem}
            keyExtractor={keyExtractor}
          />
        </div>
      )}
    </div>
  );
};

