import React from 'react';
import { View, Text, Image } from 'react-native';
import { Input, Button } from './components';
import { Link } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const LoginScreen = () => {
    return (
        <View className='flex-1 justify-center items-center bg-gray-900'>
            <Image
                source={require('../../assets/images/weather-icon.png')}
                className='w-[80px] h-[80px] mb-8'
            />
            <Text className='text-2xl mb-8 text-white font-bold'>Welcome back!</Text>
            <Input placeholder='Email' icon='mail' />
            <Input placeholder='Password' icon='lock' />
            <Button text={'Login'} onPress={() => console.log('press')} />
            <Text className='text-gray-400 mt-8'>
                Don`t have an account? <Link href={'/sign-up'} className='font-bold text-blue-500'>Sign Up</Link>
            </Text>
        </View>
    );
};

export default LoginScreen;
