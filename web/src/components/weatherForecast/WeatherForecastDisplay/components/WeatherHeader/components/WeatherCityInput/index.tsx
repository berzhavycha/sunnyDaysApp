'use client';

import { useState } from 'react';

import { useCitySearchList, useSubscriptionError } from '@/context';
import { useCityInputComplete, useAddWeatherSubscription } from '@/hooks';
import { InputAutocomplete, Button } from '@/components/common';
import { ADD_SUBSCRIPTION_BTN_CONTENT } from '@/components/weatherForecast';
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
    <div className="w-full flex items-start justify-between mb-2 gap-4 sm:gap-8 md:max-xl:mb-0">
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
      <Button
        content={ADD_SUBSCRIPTION_BTN_CONTENT}
        onClick={onAddSubscription}
        styles="text-xs py-1 px-1 sm:text-base sm:py-2 sm:px-4"
      />
    </div>
  );
};
