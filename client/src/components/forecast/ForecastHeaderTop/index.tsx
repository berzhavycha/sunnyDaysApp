import { useMutation } from '@apollo/client';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SIGN_OUT_MUTATION } from '@/apollo';
import { useAuth } from '@/context';
import { FontAwesome } from '@expo/vector-icons';

export const ForecastHeaderTop = (): JSX.Element => {
    const { authState, onSignOut } = useAuth();
    const [signOutMutation] = useMutation(SIGN_OUT_MUTATION, {
        variables: {
            authorization: `Bearer ${authState.accessToken}`,
        },
    });

    const handleSignOut = async (): Promise<void> => {
        await signOutMutation();
        await onSignOut();
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

