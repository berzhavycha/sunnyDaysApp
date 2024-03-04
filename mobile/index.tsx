import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import './globals';

export function App(): JSX.Element {
  const ctx = require.context('./src/app');
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
