import { FC } from 'react';
import { Stack } from 'expo-router';

const AppLayout: FC = () => {
  return (
    <Stack>
      <Stack.Screen name="weather-forecast/index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AppLayout;
