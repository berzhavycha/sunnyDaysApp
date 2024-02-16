import { useMutation } from '@apollo/client';

import { useCurrentUser } from '@/context';
import { SignOutDocument } from './mutations';

type HookReturn = {
  loading: boolean;
  signOutHandler: () => Promise<void>;
};

export const useSignOut = (): HookReturn => {
  const { onSignOut } = useCurrentUser();
  const [signOutMutation, { loading }] = useMutation(SignOutDocument);

  const signOutHandler = async (): Promise<void> => {
    await onSignOut();
    await signOutMutation();
  };

  return {
    loading,
    signOutHandler,
  };
};
