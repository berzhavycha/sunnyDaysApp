'use client'

import { useState } from 'react';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAddWeatherSubscription, useCityInputComplete } from '@/hooks';
import { useCitySearchList, useCurrentTempUnit, useCurrentUser, useSubscriptionError } from '@/context';
import { Button, InputAutocomplete } from '@/components/common';
import { useRenderCityItem } from './hooks';
import { tempUnitSigns } from '@/context/CurrentTempUnit/constants';

export const WeatherHeader = (): JSX.Element => {
    const [city, setCity] = useState<string>('')
    const { error } = useSubscriptionError()
    const { listState, onInputFocus, onPressOutside } = useCitySearchList()
    const { addSubscription } = useAddWeatherSubscription(setCity)
    const { renderCityItem } = useRenderCityItem(addSubscription)
    const { onSignOut } = useCurrentUser()
    const { data, loading } = useCityInputComplete(city);
    const { currentTempUnit, onTempUnitChange } = useCurrentTempUnit()

    const onAddSubscription = async (): Promise<void> => await addSubscription(city)

    return (
        <header className='w-full flex justify-between items-baseline'>
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
                />
                <Button content="Add" onClick={onAddSubscription} />
            </div>
            <div className="flex gap-6">
                <Button content={tempUnitSigns[currentTempUnit.name]} onClick={onTempUnitChange} />
                <Button content={<FontAwesomeIcon icon={faSignOut} className='text-white text-md' />} onClick={onSignOut} />
            </div>
        </header>
    );
};