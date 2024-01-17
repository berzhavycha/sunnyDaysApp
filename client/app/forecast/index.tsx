import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { SAY_HELLO_QUERY } from '../../apollo';


const ForecastScreen = () => {
    const { loading, error, data } = useQuery(SAY_HELLO_QUERY);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    const helloMessage = data.sayHello;

    return (
        <View className='flex-1 justify-center items-center bg-gray-900'>
            <Text>{helloMessage}</Text>
        </View>
    );
};

export default ForecastScreen;
