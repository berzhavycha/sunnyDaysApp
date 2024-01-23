import React, { useState } from 'react';
import { View } from 'react-native';
import { GET_CITIES } from '@/apollo';
import { Button, InputAutocomplete, ListItem } from '../../common';
import { ADD_CITY_BTN_TEXT } from '../constants';
import { REACT_APP_GEODB_CLIENT_NAME } from '@env';
import { useInputCompleteQuery } from '@/hooks';
import { getCitiesQueryVariables, extractData } from './utils';
import { City, CityQuery, QueryVariables} from './interfaces'

export const ForecastHeaderDown = (): JSX.Element => {
    const [city, setCity] = useState<string>('');
    const { data, loading } = useInputCompleteQuery<CityQuery, City, QueryVariables>(
        GET_CITIES,
        city,
        getCitiesQueryVariables(city),
        { clientName: REACT_APP_GEODB_CLIENT_NAME },
        extractData
    )
    const addCityHandler = (): void => {
        console.log(city)
    }

    const handleCitySelect = (selectedCity: string): void => {
        setCity(selectedCity)
    };

    const renderCityItem = ({ item }: { item: City }): JSX.Element => (
        <ListItem content={item.node.name} onItemClick={handleCitySelect} />
    );

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
                    onPress={addCityHandler}
                />
            </View>
        </View>
    );
};

