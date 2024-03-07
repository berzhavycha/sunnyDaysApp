'use client'

import React, { useState } from 'react';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAddWeatherSubscription, useCityInputComplete } from '@/hooks';
import { useCitySearchList, useCurrentUser } from '@/context';
import { Button, InputAutocomplete } from '@/components/common';
import { useRenderCityItem } from './hooks';


export const WeatherHeader = (): JSX.Element => {
    const [search, setSearch] = useState<string>('')
    const { listState, onInputFocus, onPressOutside } = useCitySearchList()
    const { renderCityItem } = useRenderCityItem(async () => console.log('Select'))
    const { onSignOut } = useCurrentUser()
    const { addSubscription } = useAddWeatherSubscription(setSearch)
    const { data, loading } = useCityInputComplete(search);

    const onAddSubscription = async (): Promise<void> => await addSubscription(search)

    return (
        <header className='w-full flex justify-between items-baseline'>
            <div className="flex items-start w-3/4 justify-center gap-8">
                <InputAutocomplete
                    loading={loading}
                    data={data}
                    search={search}
                    onSearchChange={setSearch}
                    placeholder={'Enter your city'}
                    error={''}
                    onPressOutside={onPressOutside}
                    onInputFocus={onInputFocus}
                    isAutocompleteShown={listState.isVisible}
                    isAutocompleteEnabled={listState.isEnabled}
                    onRenderItem={renderCityItem}
                />
                <button onClick={onAddSubscription} className='w-1/4 bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700 text-white'>Add City</button>
            </div>
            <div className="flex gap-8">
                <Button content="°C" onClick={async () => console.log("°C")} />
                <button onClick={onSignOut}>
                    <FontAwesomeIcon icon={faSignOut} className='text-white text-lg hover:text-gray-400' />
                </button>
            </div>
        </header>
    );
};