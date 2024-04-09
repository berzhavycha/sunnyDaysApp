'use client';

import { FC, useState } from 'react';

import { Button, InputAutocomplete } from '@/components/common';
import { ADD_SUBSCRIPTION_BTN_CONTENT } from '@/components/weatherForecast';
import { useCitySearchList, useSubscriptionError } from '@/context';
import { City } from '@/shared';

import { useCitySearch, useRenderCityItem } from './hooks';

type Props = {
  data?: City[];
};

export const WeatherCityInput: FC<Props> = ({ data }) => {
  const [city, setCity] = useState<string>('');
  const { error } = useSubscriptionError();
  const { listState, onInputFocus, onPressOutside } = useCitySearchList();
  const { queryParamsHandler, addSubscriptionAction } = useCitySearch();

  const searchHandler = (text: string): void => {
    setCity(text);
    queryParamsHandler(text);
  };

  const onFormAction = (formData: FormData): void => {
    addSubscriptionAction(formData);
    queryParamsHandler('');
    setCity('');
  };

  const { renderCityItem } = useRenderCityItem(async (text: string): Promise<void> => {
    const formData = new FormData();
    formData.append('city', text);
    onFormAction(formData);
  });

  const keyExtractor = (item: { name: string }): string => item.name;

  return (
    <form
      action={onFormAction}
      className="w-full flex items-start justify-between mb-2 gap-4 sm:gap-8 md:max-xl:mb-0"
    >
      <InputAutocomplete
        name="city"
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
      <Button
        type="submit"
        content={ADD_SUBSCRIPTION_BTN_CONTENT}
        className="text-xs py-1 px-1 sm:text-base sm:py-2 sm:px-4"
      />
    </form>
  );
};
