'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useCurrentUser } from '@/context';

export const ProtectedLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { currentUser, loadingUser } = useCurrentUser();

  useEffect(() => {
    if (!currentUser && !loadingUser) {
      router.replace('/sign-in');
    } else {
      router.replace('/weather-forecast');
    }
  }, [currentUser, router, loadingUser]);

  return <>{children}</>;
};
