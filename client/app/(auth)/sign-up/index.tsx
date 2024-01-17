import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Input, Button } from '../components';
import { Link } from 'expo-router';
import { Loader } from '../../../components';
import { useSign } from '../hooks';
import { SIGN_UP_MUTATION } from '../../../apollo/mutations/signUp';

export type FieldErrors = {
    email: string,
    password: string,
    confirmPassword: string
}

const SignUpScreen = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [fieldsError, setFieldsError] = useState<FieldErrors>({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const { loading, handleAuth } = useSign(SIGN_UP_MUTATION, setFieldsError)

    const handleSignUp = async () => {
        if (confirmPassword != password) {
            setFieldsError(prevState => ({
                ...prevState,
                confirmPassword: 'Passwords doesn`t match'
            }))
            return
        }
        await handleAuth({ email, password })
    }

    if (loading) { return <Loader /> }

    return (
        <View className='flex-1 justify-center items-center bg-gray-900'>
            <Image
                source={require('../../../assets/images/weather-icon.png')}
                className='w-[80px] h-[80px] mb-8'
            />
            <Text className='text-2xl mb-2 text-white font-bold'>Create New Account</Text>
            <Text className='text-xs mb-8 font-light text-gray-400'>Please fill in the form to continue</Text>
            <Input
                value={email}
                onChange={setEmail}
                placeholder='Email'
                icon='mail'
                error={fieldsError.email}
            />
            <Input
                value={password}
                onChange={setPassword}
                placeholder='Password'
                icon='lock'
                error={fieldsError.password}
                isSecured={true}
            />
            <Input
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder='Confirm Password'
                icon='key'
                error={fieldsError.confirmPassword}
                isSecured={true}
            />
            <Button
                text={'Sign Up'}
                onPress={async () => await handleSignUp()} />
            <Text className='text-gray-400 mt-8'>
                Have an account? <Link href={'/login/'} className='font-bold text-blue-500'>Login</Link>
            </Text>
        </View>
    );
};

export default SignUpScreen;
