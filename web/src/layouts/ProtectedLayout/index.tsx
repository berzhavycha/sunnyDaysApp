'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';

import { useCurrentUser } from '@/context';
import { env } from '@/core/env';

export const ProtectedLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { currentUser, loadingUser } = useCurrentUser();

  const searchParams = useSearchParams();

  useEffect(() => {
    const page = searchParams.get('page') ?? 0;
    const limit = searchParams.get('perPage') ?? env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT;
    const order = searchParams.get('order') ?? env.NEXT_PUBLIC_WEATHER_CITIES_ORDER;

    if (!currentUser && !loadingUser) {
      router.replace('/sign-in');
    } else {
      router.replace(`/weather-forecast?page=${page}&perPage=${limit}&order=${order}`);
    }
  }, [currentUser, router, loadingUser]);

  return <>{children}</>;
};
