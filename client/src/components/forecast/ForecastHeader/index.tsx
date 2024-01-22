import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GET_CITIES } from '@/apollo';
import { Button, InputAutocomplete } from '../../common';
import { ForecastHeaderTop } from '../ForecastHeaderTop';

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

export const ForecastHeader = (): JSX.Element => {
    const [city, setCity] = useState<string>('');

    const addCityHandler = (): void => {
        console.log(city)
    }

    const handleCitySelect = (selectedCity: string): void => {
        setCity(selectedCity)
    };

    const renderCityItem = ({ item }: { item: City }): JSX.Element => (
        <TouchableOpacity className='p-2' onPress={() => handleCitySelect(item.node.name)}>
            <Text className='text-white'>{item.node.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View>
            <ForecastHeaderTop />
            <View className='w-full flex-row justify-between'>
                <View className='w-60'>
                    <InputAutocomplete<CitiesQueryVariables, City>
                        variables={{
                            namePrefix: city,
                            sort: 'name',
                            first: 5,
                        }}
                        context={{
                            clientName: 'cities-endpoint'
                        }}
                        renderItem={renderCityItem}
                        query={GET_CITIES}
                        search={city}
                        setSearch={setCity}
                        keyExtractor={(item) => item.node.name}
                        dataExtractor={(data) => data ? data?.populatedPlaces.edges : []}
                    />
                </View>
                <View className='w-14'>
                    <Button
                        text='+'
                        onPress={addCityHandler}
                    />
                </View>
            </View>
        </View>
    );
};

