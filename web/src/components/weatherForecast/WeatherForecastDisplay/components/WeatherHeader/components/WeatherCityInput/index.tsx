'use client';

import { FC, useState, useTransition } from 'react';

import { InputAutocomplete } from '@/components/common';
import { useCitySearchList, useSubscriptionError, useWeatherCardsList } from '@/context';
import { City } from '@/shared';

import { useCitySearch, useRenderCityItem } from './hooks';
import { SubmitCityButton } from '../SubmitCityButton';
import { validateCity } from './utils';

type Props = {
  data?: City[];
};

export const WeatherCityInput: FC<Props> = ({ data }) => {
  const [city, setCity] = useState<string>('');
  const { error, setError } = useSubscriptionError();
  const { weatherData } = useWeatherCardsList()
  const { listState, onInputFocus, onPressOutside } = useCitySearchList();
  const { queryParamsHandler, addSubscriptionAction } = useCitySearch();
  const [isPending, startTransition] = useTransition()

  const searchHandler = (text: string): void => {
    setCity(text);
    queryParamsHandler(text);
  };

  const onFormAction = (formData: FormData): void => {
    const city = formData.get('city')?.toString() ?? ''

    const errorMessage = validateCity(city, weatherData)

    if (errorMessage) {
      setError({ message: errorMessage })
    }

    startTransition(() => {
      addSubscriptionAction(formData).then(() => {
        queryParamsHandler('');
        setCity('');
      })
    })
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
        loading={isPending}
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
      <SubmitCityButton isPending={isPending} />
    </form>
  );
};
