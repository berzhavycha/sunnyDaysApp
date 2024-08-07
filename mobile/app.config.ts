import type { ConfigContext, ExpoConfig } from '@expo/config';

import { ClientEnv } from './env';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  experiments: {
    tsconfigPaths: true,
  },
  name: 'client',
  slug: 'client',
  version: '1.0.0',
  orientation: 'portrait',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  splash: {
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    config: {
      usesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#ffffff',
    },
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    [
      'expo-router',
      {
        unstable_src: './src/app',
      },
    ],
  ],
  extra: {
    ...ClientEnv,
    router: {
      origin: false,
      unstable_src: './src/app',
    },
  },
});
