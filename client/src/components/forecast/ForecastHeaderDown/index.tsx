import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GET_CITIES } from '@/apollo';
import { Button, InputAutocomplete } from '../../common';
import { ADD_CITY_BTN_TEXT } from '../constants';
import { REACT_APP_FETCH_CITY_AMOUNT, REACT_APP_FETCH_CITY_SORT, REACT_APP_GEODB_CLIENT_NAME } from '@env';

type City = {
    node: {
        name: string;
    };
};

type CitiesQueryVariables = {
    namePrefix: string,
    sort: string,
    first: number,
}

type DataExtractorType = {
    populatedPlaces: {
        edges: City[];
    };
};

export const ForecastHeaderDown = (): JSX.Element => {
    const [city, setCity] = useState<string>('');

    const addCityHandler = (): void => {
        console.log(city)
    }

    const handleCitySelect = (selectedCity: string): void => {
        setCity(selectedCity)
    };

    const renderCityItem = ({ item }: { item: City }): JSX.Element => (
        <TouchableOpacity className='w-full p-2' onPress={() => handleCitySelect(item.node.name)}>
            <Text className='w-full text-white'>{item.node.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View className='w-full flex-row justify-between'>
            <View className='w-60'>
                <InputAutocomplete<DataExtractorType, City, CitiesQueryVariables>
                    variables={{
                        namePrefix: city,
                        sort: REACT_APP_FETCH_CITY_SORT,
                        first: REACT_APP_FETCH_CITY_AMOUNT,
                    }}
                    context={{
                        clientName: REACT_APP_GEODB_CLIENT_NAME
                    }}
                    renderItem={renderCityItem}
                    query={GET_CITIES}
                    search={city}
                    setSearch={setCity}
                    keyExtractor={(item) => item.node.name}
                    dataExtractor={(data) => data ? data?.populatedPlaces.edges : []}
                    placeholder='Search City'
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

