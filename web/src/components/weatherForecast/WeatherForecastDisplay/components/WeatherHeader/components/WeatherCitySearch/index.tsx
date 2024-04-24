'use client';

import { FC, useRef } from 'react';

import { CityAutocomplete, CityRef } from '../CityAutocomplete';
import { SubmitCityButton } from '../SubmitCityButton';

import { useAddSubscription } from './hooks';

export const WeatherCitySearch: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const cityAutocompleteRef = useRef<CityRef>(null);

  const { addSubscriptionAction } = useAddSubscription();

  const onSubmit = (): void => cityAutocompleteRef.current?.resetCity();

  return (
    <form
      ref={formRef}
      action={addSubscriptionAction}
      onSubmit={onSubmit}
      className="w-full flex items-start justify-between mb-2 gap-4 sm:gap-8 md:max-xl:mb-0"
    >
      <CityAutocomplete ref={cityAutocompleteRef} formRef={formRef} />
      <SubmitCityButton />
    </form>
  );
};
