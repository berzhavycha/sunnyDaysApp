'use client';

import { FC, useState } from 'react';

import { InputAutocomplete } from '@/components/common';
import { useCitySearchList, useSubscriptionError } from '@/context';
import { useCityInputAutocomplete } from '@/hooks';

import { SubmitCityButton } from '../SubmitCityButton';

import { useCitySearch, useRenderCityItem } from './hooks';

export const WeatherCityInput: FC = () => {
  const [city, setCity] = useState<string>('');

  const { error } = useSubscriptionError();
  
  const { listState, onInputFocus, onPressOutside } = useCitySearchList();
  const { addSubscriptionAction } = useCitySearch();
  
  const { data, loading } = useCityInputAutocomplete(city);

  const searchHandler = (text: string): void => setCity(text);

  const onSubmit = (): void => setCity('');

  const { renderCityItem } = useRenderCityItem(async (text: string): Promise<void> => {
    const formData = new FormData();
    formData.append('city', text);
    addSubscriptionAction(formData);
  });

  const keyExtractor = (item: { name: string }): string => item.name;

  return (
    <form
      action={addSubscriptionAction}
      onSubmit={onSubmit}
      className="w-full flex items-start justify-between mb-2 gap-4 sm:gap-8 md:max-xl:mb-0"
    >
      <InputAutocomplete
        name="city"
        loading={loading}
        data={data}
        search={city}
        onSearchChange={searchHandler}
        placeholder={'Enter your city'}
        error={error.message}
        onPressOutside={onPressOutside}
        onInputFocus={onInputFocus}
        isAutocompleteShown={listState.isVisible}
        isAutocompleteEnabled={listState.isEnabled}
        onRenderItem={renderCityItem}
        keyExtractor={keyExtractor}
      />
      <SubmitCityButton />
    </form>
  );
};
