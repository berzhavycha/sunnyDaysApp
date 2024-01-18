/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function App() {
  const ctx = require.context("./src/app");
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
