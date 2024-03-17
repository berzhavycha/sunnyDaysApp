'use client';

import { useState } from 'react';

import { InputAutocomplete, Button, ADD_SUBSCRIPTION_BTN_CONTENT } from '@/components';
import { useCitySearchList, useSubscriptionError } from '@/context';
import { useCityInputComplete, useAddWeatherSubscription } from '@/hooks';
import { useRenderCityItem } from '../../hooks';

export const WeatherCityInput = (): JSX.Element => {
  const [city, setCity] = useState<string>('');
  const { listState, onInputFocus, onPressOutside } = useCitySearchList();
  const { data, loading } = useCityInputComplete(city);

  const { error } = useSubscriptionError();

  const { addSubscription } = useAddWeatherSubscription(setCity);
  const { renderCityItem } = useRenderCityItem(addSubscription);

  const onAddSubscription = async (): Promise<void> => await addSubscription(city);
  const keyExtractor = (item: { name: string }): string => item.name;

  return (
    <div className="flex items-start w-3/5 justify-center gap-8 mb-2">
      <InputAutocomplete
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
        onEnter={onAddSubscription}
        keyExtractor={keyExtractor}
      />
      <Button content={ADD_SUBSCRIPTION_BTN_CONTENT} onClick={onAddSubscription} />
    </div>
  );
};
