'use client';

import { FC, useRef, useState } from 'react';

import { CityAutocomplete } from '../CityAutocomplete';
import { SubmitCityButton } from '../SubmitCityButton';

import { useAddSubscription } from './hooks';

export const WeatherCitySearch: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [city, setCity] = useState<string>('');

  const { addSubscriptionAction } = useAddSubscription();

  const onSubmit = (): void => setCity('');

  return (
    <form
      ref={formRef}
      action={addSubscriptionAction}
      onSubmit={onSubmit}
      className="w-full flex items-start justify-between mb-2 gap-4 sm:gap-8 md:max-xl:mb-0"
    >
      <CityAutocomplete city={city} setCity={setCity} formRef={formRef} />
      <SubmitCityButton />
    </form>
  );
};
