'use client';

import { Dispatch, FC, RefObject, SetStateAction } from 'react';

import { InputAutocomplete } from '@/components/common';
import { useCitySearchList, useSubscriptionError } from '@/context';
import { useCityInputAutocomplete } from '@/hooks';

import { useRenderCityItem } from './hooks';

type Props = {
    city: string;
    setCity: Dispatch<SetStateAction<string>>;
    formRef: RefObject<HTMLFormElement>
}

export const CityAutocomplete: FC<Props> = ({ city, setCity, formRef }) => {
    const { listState, onInputFocus, onPressOutside } = useCitySearchList();
    const { data, loading } = useCityInputAutocomplete(city);
    const searchHandler = (text: string): void => setCity(text);
    
    const { error } = useSubscriptionError();

    const { renderCityItem } = useRenderCityItem((text: string): void => {
        const inputElement = formRef.current?.querySelector('input');
        if (formRef.current && inputElement) {
            inputElement.value = text;
            formRef.current.requestSubmit();
        }
    });
    
    const keyExtractor = (item: { name: string }): string => item.name;

    return (
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
    );
};
