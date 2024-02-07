import { Stack } from 'expo-router';

const PublicLayout = (): JSX.Element => {
  return (
    <Stack>
      <Stack.Screen name="sign-in/index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up/index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PublicLayout;
