import React from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from './components';
import { Link } from 'expo-router';

const LoginScreen = () => {
    return (
        <View>
            <Text className='text-2xl mb-8 text-white font-bold'>Welcome back!</Text>
            <Input placeholder='Email' />
            <Input placeholder='Password' />
            <Button text={'Login'} onPress={() => console.log('press')} />
            <Text className='text-gray-400 mt-8'>
                Don`t have an account? <Link href={'/sign-up'} className='font-bold text-blue-500'>Sign Up</Link>
            </Text>
        </View>
    );
};

export default LoginScreen;
