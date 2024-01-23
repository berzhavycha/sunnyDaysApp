import React from 'react';
import { View, Text, Image } from 'react-native';

interface WeatherCardProps {
    city: string;
    temperature: string;
    rain: string;
    description: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    weatherImage: any; // You can replace 'any' with the appropriate type for your image data
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, temperature,description, rain, weatherImage }) => {
    return (
        <View className='flex flex-row p-4 pt-2 items-start justify-between bg-blue-800 rounded-xl'>
            <View className='flex'>
                <Text className='text-[42px] mb-2 font-bold text-white'>{temperature}</Text>
                <Text className='text-xs mb-1 text-white'>{description}</Text>
                <Text className='text-xs text-white mb-2'>Precipitation: {rain}</Text>
                <Text className='text-[20px] font-bold font-light text-white'>{city}</Text>
            </View>
            <Image source={weatherImage} className='w-24 h-24' />
        </View>
    );
};


export default WeatherCard;
