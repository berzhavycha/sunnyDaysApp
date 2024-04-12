'use client';

import { useMutation } from '@apollo/client';

import { useCurrentUser, useWeatherPaginationInfo } from '@/context';

import { SignOutDocument } from './mutations';
import { useRouter } from 'next/navigation';

type HookReturn = {
  loading: boolean;
  signOutHandler: () => Promise<void>;
};

export const useSignOut = (): HookReturn => {
  const { onSignOut } = useCurrentUser();
  const { setPaginationOptions } = useWeatherPaginationInfo();
  const [signOutMutation, { loading }] = useMutation(SignOutDocument);
  const router = useRouter()

  const signOutHandler = async (): Promise<void> => {
    await onSignOut();
    await signOutMutation();
    router.replace('/sign-in')

    setPaginationOptions((prev) => ({
      ...prev,
      offset: 0,
    }));
  };

  return {
    loading,
    signOutHandler,
  };
};
