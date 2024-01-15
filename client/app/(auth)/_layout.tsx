import { Slot } from 'expo-router';
import { View, Image } from 'react-native';

export default function AuthLayout() {
    return (
        <View className='flex-1 justify-center items-center bg-gray-900'>
            <Image
                source={require('../../assets/images/weather-icon.png')}
                className='w-[80px] h-[80px] mb-8'
            />
            <Slot />
        </View>
    )
}