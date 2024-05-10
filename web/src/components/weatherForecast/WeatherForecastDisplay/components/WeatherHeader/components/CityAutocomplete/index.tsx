'use client';

import { Ref, RefObject, forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { InputAutocomplete } from '@/components/common';
import { useCitySearchList, useSubscriptionError } from '@/context';

import { useRenderCityItem } from './hooks';
import { getCitiesByPrefix, DEBOUNCE_DELAY } from '@/services';
import { City } from '@/shared';

export type CityRef = {
  resetCity: () => void
}

type Props = {
  formRef: RefObject<HTMLFormElement>;
};

export const CityAutocomplete = forwardRef<CityRef, Props>(({ formRef }, ref: Ref<CityRef>) => {
  const [city, setCity] = useState<string>('');
  const [autocompleteCities, setAutocompleteCities] = useState<City[]>([])

  const { listState, onInputFocus, onPressOutside } = useCitySearchList();

  const { error } = useSubscriptionError();

  const { renderCityItem } = useRenderCityItem((text: string): void => {
    const inputElement = formRef.current?.querySelector('input');
    if (formRef.current && inputElement) {
      inputElement.value = text;
      formRef.current.requestSubmit();
    }
  });

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

  return (
    <InputAutocomplete
      name="city"
      data={autocompleteCities}
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
