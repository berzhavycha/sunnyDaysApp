'use client';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { ChangeEvent, useRef } from 'react';
import { useFormStatus } from 'react-dom';

import { useOutsideClick } from '@/hooks';

import { CustomFlatList } from '../CustomFlatList';
import { Input } from '../Input';

type Props<TItem> = {
  name: string;
  loading?: boolean;
  data?: TItem[];
  search?: string;
  onRenderItem: (item: TItem) => JSX.Element;
  onSearchChange: (text: string) => void;
  placeholder: string;
  error: string;
  onPressOutside: () => void;
  onInputFocus: () => void;
  isAutocompleteShown: boolean;
  isAutocompleteEnabled?: boolean;
  onEnter?: () => Promise<void>;
  keyExtractor: (item: TItem) => string;
  defaultValue?: string;
};

export const InputAutocomplete = <TItem,>({
  name,
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
  defaultValue,
}: Props<TItem>): JSX.Element => {
  const autocompleteRef = useRef<HTMLDivElement>(null);
  useOutsideClick(autocompleteRef, onPressOutside);

  const { pending } = useFormStatus();

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => onSearchChange(e.target.value);
  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (e.key === 'Enter' && onEnter) {
      await onEnter();
    }
  };

  return (
    <div className="relative w-full" ref={autocompleteRef}>
      <Input
        name={name}
        value={search}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        icon={faSearch}
        error={error}
        onFocus={onInputFocus}
        autoComplete="off"
        className={`${pending ? 'bg-sky-200' : 'bg-slate-200'} text-xs sm:pl-11 sm:text-base sm:py-2`}
        iconStyles="top-2 text-xs sm:text-base md:text-md md:text-xl"
        defaultValue={defaultValue}
      />
      {data && isAutocompleteShown && isAutocompleteEnabled && (
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
