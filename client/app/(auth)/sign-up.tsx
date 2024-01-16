import React from 'react';
import { View, Text, Image } from 'react-native';
import { Input, Button } from './components';
import { Link } from 'expo-router';

const SignUpScreen = () => {
    return (
        <View className='flex-1 justify-center items-center bg-gray-900'>
            <Image
                source={require('../../assets/images/weather-icon.png')}
                className='w-[80px] h-[80px] mb-8'
            />
            <Text className='text-2xl mb-2 text-white font-bold'>Create New Account</Text>
            <Text className='text-xs mb-8 font-light text-gray-400'>Please fill in the form to continue</Text>
            <Input placeholder='Email' icon='mail' />
            <Input placeholder='Password' icon='lock' />
            <Input placeholder='Confirm Password' icon='key' />
            <Button text={'Sign Up'} onPress={() => console.log('press')} />
            <Text className='text-gray-400 mt-8'>
                Have an account? <Link href={'/login'} className='font-bold text-blue-500'>Login</Link>
            </Text>
        </View>
    );
};

export default SignUpScreen;
