import { useMutation } from '@apollo/client';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SIGN_OUT_MUTATION } from '@/hooks';
import { useAuthManager } from '@/context';
import { FontAwesome } from '@expo/vector-icons';

export const ForecastHeaderTop = (): JSX.Element => {
    const { tokens, setTokens, onSignOut } = useAuthManager();
    const [signOutMutation] = useMutation(SIGN_OUT_MUTATION, {
        variables: {
            authorization: tokens?.accessToken ? `Bearer ${tokens.accessToken}` : '',
        },
    });

    const handleSignOut = async (): Promise<void> => {
        await onSignOut();
        await signOutMutation();
        setTokens(null)
    };

    return (
        <View className='w-full flex-row items-center mb-4 justify-between'>
            <View>
                <Text className="text-white text-lg">Manage Cities</Text>
            </View>
            <View>
                <TouchableOpacity
                    onPress={async () => await handleSignOut()}
                >
                    <FontAwesome name="sign-out" size={24} color="#ccc" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

