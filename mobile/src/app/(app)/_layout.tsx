import { Stack } from 'expo-router';
import { FC } from 'react';

const AppLayout: FC = () => {
  return (
    <Stack>
      <Stack.Screen name="weather-forecast/index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AppLayout;
