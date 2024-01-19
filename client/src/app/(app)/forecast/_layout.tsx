import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../../context";

export default function AppLayout(): JSX.Element {
  const { authState } = useAuth();
  console.log(authState);

  if (!authState.accessToken) {
    return <Redirect href="/sign-in/" />;
  }

  return <Stack />;
}
