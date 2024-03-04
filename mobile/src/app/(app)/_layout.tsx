import { Stack } from 'expo-router';

const AppLayout = (): JSX.Element => {
  return (
    <Stack>
      <Stack.Screen name="weather-forecast/index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AppLayout;
