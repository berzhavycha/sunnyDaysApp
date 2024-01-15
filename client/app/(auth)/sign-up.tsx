import React from 'react';
import { View, Text } from 'react-native';
import {Input,Button} from './components';
import { Link } from 'expo-router';

const SignUpScreen = () => {
    return (
        <View>
            <Text className='text-2xl mb-2 text-white font-bold'>Create New Account</Text>
            <Text className='text-xs mb-8 font-light text-gray-400'>Please fill in the form to continue</Text>
            <Input placeholder='Email' />
            <Input placeholder='Password' />
            <Input placeholder='Confirm Password' />
            <Button text={'Sign Up'} onPress={() => console.log('press')} />
            <Text className='text-gray-400 mt-8'>
                Have an account? <Link href={'/login'} className='font-bold text-blue-500'>Login</Link>
            </Text>
        </View>
    );
};

export default SignUpScreen;
