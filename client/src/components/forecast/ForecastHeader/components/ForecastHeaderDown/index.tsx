import React, { useState } from 'react';
import { View } from 'react-native';
import { GET_CITIES } from '@/apollo';
import { Button, InputAutocomplete } from '@/components';
import { SpinnerView } from '@/components/forecast/SpinnerView'
import { ADD_CITY_BTN_TEXT } from '../../../constants';
import { REACT_APP_GEODB_CLIENT_NAME } from '@env';
import { useInputCompleteQuery, useWeatherSubscription } from '@/hooks';
import { getCitiesQueryVariables, extractData } from './utils';
import { City, CityQuery, QueryVariables } from './interfaces'
import { useCitySelection } from './hooks';

export const ForecastHeaderDown = (): JSX.Element => {
    const [city, setCity] = useState<string>('');
    const { addSubscriptionHandler, additionLoading } = useWeatherSubscription()
    const { renderCityItem } = useCitySelection(setCity)
    const { data, loading } = useInputCompleteQuery<CityQuery, City, QueryVariables>(
        GET_CITIES,
        city,
        getCitiesQueryVariables(city),
        { clientName: REACT_APP_GEODB_CLIENT_NAME },
        extractData
    )

    if (additionLoading) return <SpinnerView />

    return (
        <View className='w-full flex-row justify-between'>
            <View className='w-60'>
                <InputAutocomplete<City>
                    loading={loading}
                    onRenderItem={renderCityItem}
                    placeholder='Search City'
                    search={city}
                    onSearchChange={setCity}
                    data={data}
                />
            </View>
            <View className='w-14'>
                <Button
                    text={ADD_CITY_BTN_TEXT}
                    onPress={async () => { await addSubscriptionHandler(city) }}
                />
            </View>
        </View>
    );
};

