import { Slot, useRouter, useSegments } from 'expo-router';
import { FC, useEffect } from 'react';

import { useCurrentUser } from '@/context';

export const InitialLayout: FC = () => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();
  const segments = useSegments();

  const inAppSegment = segments[0] === '(app)';

  useEffect(() => {
    if (currentUser && !inAppSegment) {
      router.replace('/weather-forecast/');
    } else if (!currentUser) {
      router.replace('/sign-in/');
    }
  }, [currentUser]);

  return <Slot />;
};
