import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../../context";

export default function ForecastLayout(): JSX.Element {
  const { authState } = useAuth();

  if (!authState.accessToken) {
    return <Redirect href="/sign-in/" />;
  }

  return <Stack />;
}
