import { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';

import { useAuthManager } from '@/context';

export const InitialLayout = (): JSX.Element => {
  const { authState } = useAuthManager();
  const router = useRouter();
  const segments = useSegments();

  const inAppSegment = segments[0] === '(app)';

  useEffect(() => {
    if (authState.isAuthenticated && !inAppSegment) {
      router.replace('/weather-forecast/');
    } else if (!authState.isAuthenticated) {
      router.replace('/sign-in/');
    }
  }, [authState]);

  return <Slot />;
};
