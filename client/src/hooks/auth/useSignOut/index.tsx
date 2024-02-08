import { useMutation } from '@apollo/client';

import { useAuthManager } from '@/context';
import { SignOutDocument } from './mutations';

export type SignOutHookReturn = {
  loading: boolean;
  signOutHandler: () => Promise<void>;
};

export const useSignOut = (): SignOutHookReturn => {
  const { onSignOut } = useAuthManager();
  const [signOutMutation, { loading }] = useMutation(SignOutDocument);

  const signOutHandler = async (): Promise<void> => {
    await signOutMutation();
    await onSignOut();
  };

  return {
    loading,
    signOutHandler,
  };
};
