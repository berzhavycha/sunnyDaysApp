'use client';

import { FC, useRef } from 'react';

import { useParseWeatherData } from '@/hooks';

import { CityAutocomplete, CityRef } from '../CityAutocomplete';
import { SubmitCityButton } from '../SubmitCityButton';

import { useAddSubscription } from './hooks';

type Props = {
  weatherResponse: string;
};

export const WeatherCitySearch: FC<Props> = ({ weatherResponse }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const cityAutocompleteRef = useRef<CityRef>(null);
  const { error: weatherErrorMessage, weatherData } = useParseWeatherData(weatherResponse);

  const { error: addSubscriptionErrorMessage, addSubscriptionAction } =
    useAddSubscription(weatherData);

  const onSubmit = (): void => cityAutocompleteRef.current?.resetCity();

  return (
    <form
      ref={formRef}
      action={addSubscriptionAction}
      onSubmit={onSubmit}
      className="w-full flex items-start justify-between mb-2 gap-4 sm:gap-8 md:max-xl:mb-0"
    >
      <CityAutocomplete
        errorMessage={weatherErrorMessage || addSubscriptionErrorMessage}
        ref={cityAutocompleteRef}
        formRef={formRef}
      />
      <SubmitCityButton />
    </form>
  );
};
