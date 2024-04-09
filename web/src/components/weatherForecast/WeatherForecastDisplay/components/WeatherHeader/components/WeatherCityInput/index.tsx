'use client'

import { FC, useEffect } from 'react';

import { Button, InputAutocomplete } from '@/components/common';
import { ADD_SUBSCRIPTION_BTN_CONTENT } from '@/components/weatherForecast';
import { useCitySearchList, useSubscriptionError, useWeatherCardsList } from '@/context';
import { City, DEBOUNCE_DELAY, useQueryParams } from '@/hooks';

import { useRenderCityItem } from '../../hooks';
import { useFormState } from 'react-dom';
import { addWeatherSubscription } from '@/services';
import { ApolloError } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

type Props = {
  data?: City[]
}

export const WeatherCityInput: FC<Props> = ({ data }) => {
  const { weatherData } = useWeatherCardsList()
  const { error, setError, errorHandler } = useSubscriptionError();
  const addWeatherSubscriptionWithParams = addWeatherSubscription.bind(null, weatherData)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [addSubscriptionState, addSubscriptionAction] = useFormState(addWeatherSubscriptionWithParams, {
    error: '',
  })
  const searchParams = useSearchParams();

  const { updateQueryParams, deleteQueryParam } = useQueryParams()

  useEffect(() => {
    try {
      if (addSubscriptionState.error.startsWith('{') && addSubscriptionState.error.endsWith('}')) {
        const apolloError = JSON.parse(addSubscriptionState.error)

        throw new ApolloError({ graphQLErrors: apolloError.graphQLErrors })
      }

      setError({ message: addSubscriptionState.error })
    } catch (error) {
      if (error instanceof ApolloError) {
        errorHandler(error)
      }
    }
  }, [addSubscriptionState])

  const { listState, onInputFocus, onPressOutside } = useCitySearchList();

  const handleSearch = useDebouncedCallback((text: string): void => {
    if (text) {
      updateQueryParams({ citySearch: text })
    } else {
      deleteQueryParam('citySearch')
    }
  }, DEBOUNCE_DELAY)

  const { renderCityItem } = useRenderCityItem(async (text: string): Promise<void> => console.log(text));

  const onAddSubscription = async (): Promise<void> => console.log('enter')
  const keyExtractor = (item: { name: string }): string => item.name;

  return (
    <form action={addSubscriptionAction} className="w-full flex items-start justify-between mb-2 gap-4 sm:gap-8 md:max-xl:mb-0">
      <InputAutocomplete
        name='city'
        data={data}
        onSearchChange={handleSearch}
        placeholder={'Enter your city'}
        error={error.message}
        onPressOutside={onPressOutside}
        onInputFocus={onInputFocus}
        isAutocompleteShown={listState.isVisible}
        isAutocompleteEnabled={listState.isEnabled}
        onRenderItem={renderCityItem}
        onEnter={onAddSubscription}
        keyExtractor={keyExtractor}
        defaultValue={searchParams.get('citySearch')?.toString()}
      />
      <Button
        type='submit'
        content={ADD_SUBSCRIPTION_BTN_CONTENT}
        onClick={onAddSubscription}
        className="text-xs py-1 px-1 sm:text-base sm:py-2 sm:px-4"
      />
    </form>
  );
};
