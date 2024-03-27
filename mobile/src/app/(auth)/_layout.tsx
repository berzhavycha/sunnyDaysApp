import { FC } from 'react';
import { Stack } from 'expo-router';

const PublicLayout: FC = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in/index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up/index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PublicLayout;
