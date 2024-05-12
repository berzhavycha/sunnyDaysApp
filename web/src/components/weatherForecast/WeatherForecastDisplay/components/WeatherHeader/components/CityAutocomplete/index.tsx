'use client';

import { Ref, RefObject, forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { InputAutocomplete } from '@/components/common';

import { getCitiesByPrefix, DEBOUNCE_DELAY } from '@/services';
import { City } from '@/shared';
import { useCitySearchList } from './hooks';
import { CityAutocompleteItem } from '../CityAutocompleteItem';

export type CityRef = {
  resetCity: () => void
}

type Props = {
  formRef: RefObject<HTMLFormElement>;
  errorMessage: string;
};

export const CityAutocomplete = forwardRef<CityRef, Props>(({ formRef, errorMessage }, ref: Ref<CityRef>) => {
  const [city, setCity] = useState<string>('');
  const [autocompleteCities, setAutocompleteCities] = useState<City[]>([])

  const { listState, onInputFocus, onPressOutside } = useCitySearchList();

  const onCitySelect = (text: string): void => {
    const inputElement = formRef.current?.querySelector('input');
    if (formRef.current && inputElement) {
      inputElement.value = text;
      formRef.current.requestSubmit();
    }
  }

  useEffect(() => {
    const timerId = setTimeout(async () => {
      const cities = await getCitiesByPrefix(city)
      setAutocompleteCities(cities)
    }, DEBOUNCE_DELAY);

    return (): void => {
      clearTimeout(timerId);
    };
  }, [city]);

  const resetCity = (): void => setCity('');

  useImperativeHandle(ref, () => ({
    resetCity
  }))

  const keyExtractor = (item: { name: string }): string => item.name;
  const renderCityItem = (item: City): JSX.Element => <CityAutocompleteItem {...item} onPressOutside={onPressOutside} onCitySelect={onCitySelect} />

  return (
    <InputAutocomplete
      name="city"
      data={autocompleteCities}
      search={city}
      onSearchChange={setCity}
      placeholder={'Enter your city'}
      error={errorMessage}
      onPressOutside={onPressOutside}
      onInputFocus={onInputFocus}
      isAutocompleteShown={listState.isVisible}
      isAutocompleteEnabled={listState.isEnabled}
      onRenderItem={renderCityItem}
      keyExtractor={keyExtractor}
    />
  );
});
