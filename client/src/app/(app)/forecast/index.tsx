import { useMutation } from '@apollo/client';
import React from 'react';
import { View } from 'react-native';
import { SIGN_OUT_MUTATION } from '@/apollo';
import { Button } from '@/components';
import { useAuth } from '@/context';

const ForecastScreen = (): JSX.Element => {
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
    <View className="flex-1 justify-center items-center bg-gray-900">
      <Button text="SIGN OUT" onPress={async () => await handleSignOut()} />
    </View>
  );
};

export default ForecastScreen;
