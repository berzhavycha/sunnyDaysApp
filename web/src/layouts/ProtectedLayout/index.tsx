'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useCurrentUser } from '@/context';
import { env } from '@/core/env';

export const ProtectedLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { currentUser, loadingUser } = useCurrentUser();

  const searchParams = useSearchParams();

  useEffect(() => {
    const offset = searchParams.get('offset') ?? 0;
    const limit = searchParams.get('limit') ?? env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT;
    const order = searchParams.get('order') ?? env.NEXT_PUBLIC_WEATHER_CITIES_ORDER;

    if (!currentUser && !loadingUser) {
      router.replace('/sign-in');
    } else {
      router.replace(`/weather-forecast?offset=${offset}&limit=${limit}&order=${order}`);
    }
  }, [currentUser, router, loadingUser]);

  return <>{children}</>;
};
