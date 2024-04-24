'use client';

import { Ref, RefObject, forwardRef, useImperativeHandle, useState } from 'react';

import { InputAutocomplete } from '@/components/common';
import { useCitySearchList, useSubscriptionError } from '@/context';
import { useCityInputAutocomplete } from '@/hooks';

import { useRenderCityItem } from './hooks';

export type CityRef = {
  resetCity: () => void
}

type Props = {
  formRef: RefObject<HTMLFormElement>;
};

export const CityAutocomplete = forwardRef<CityRef, Props>(({ formRef }, ref: Ref<CityRef>) => {
  const [city, setCity] = useState<string>('');

  const { listState, onInputFocus, onPressOutside } = useCitySearchList();
  const { data, loading } = useCityInputAutocomplete(city);

  const { error } = useSubscriptionError();

  const { renderCityItem } = useRenderCityItem((text: string): void => {
    const inputElement = formRef.current?.querySelector('input');
    if (formRef.current && inputElement) {
      inputElement.value = text;
      formRef.current.requestSubmit();
    }
  });

  const resetCity = (): void => setCity('');

  useImperativeHandle(ref, () => ({
    resetCity
  }))

  const keyExtractor = (item: { name: string }): string => item.name;

  return (
    <InputAutocomplete
      name="city"
      loading={loading}
      data={data}
      search={city}
      onSearchChange={setCity}
      placeholder={'Enter your city'}
      error={error.message}
      onPressOutside={onPressOutside}
      onInputFocus={onInputFocus}
      isAutocompleteShown={listState.isVisible}
      isAutocompleteEnabled={listState.isEnabled}
      onRenderItem={renderCityItem}
      keyExtractor={keyExtractor}
    />
  );
});
