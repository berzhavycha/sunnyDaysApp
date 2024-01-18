import { Stack } from "expo-router";

export default function Layout(): JSX.Element {
  return (
    <Stack>
      <Stack.Screen name="sign-in/index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up/index" options={{ headerShown: false }} />
    </Stack>
  );
}
