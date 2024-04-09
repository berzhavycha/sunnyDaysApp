'use client';

import { useMutation } from '@apollo/client';

import { useCurrentUser,  useWeatherPaginationInfo } from '@/context';

import { SignOutDocument } from './mutations';

type HookReturn = {
  loading: boolean;
  signOutHandler: () => Promise<void>;
};

export const useSignOut = (): HookReturn => {
  const { onSignOut } = useCurrentUser();
  const { setPaginationOptions } = useWeatherPaginationInfo();
  const [signOutMutation, { loading }] = useMutation(SignOutDocument);

  const signOutHandler = async (): Promise<void> => {
    await onSignOut();
    await signOutMutation();

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
