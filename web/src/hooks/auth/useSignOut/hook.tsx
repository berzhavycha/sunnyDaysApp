'use client';

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

import { useCurrentUser, useWeatherPaginationInfo } from '@/context';
import { onAuthCachePurge } from '@/services';

import { SignOutDocument } from './mutations';

type HookReturn = {
  loading: boolean;
  signOutHandler: () => Promise<void>;
};

export const useSignOut = (): HookReturn => {
  const { onSignOut } = useCurrentUser();
  const { setPaginationOptions } = useWeatherPaginationInfo();
  const [signOutMutation, { loading }] = useMutation(SignOutDocument);
  const router = useRouter();

  const signOutHandler = async (): Promise<void> => {
    await onSignOut();
    await signOutMutation();

    setPaginationOptions((prev) => ({
      ...prev,
      offset: 0,
    }));

    router.replace('/sign-in');
    await onAuthCachePurge();
  };

  return {
    loading,
    signOutHandler,
  };
};
