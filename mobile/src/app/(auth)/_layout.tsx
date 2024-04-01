import { Stack } from 'expo-router';
import { FC } from 'react';

const PublicLayout: FC = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in/index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up/index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PublicLayout;
