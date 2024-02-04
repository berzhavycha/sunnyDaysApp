import { useMutation } from '@apollo/client';
import { useAuthManager } from '@/context';
import { SIGN_OUT_MUTATION } from './mutations';

export type SignOutHookReturn = {
  loading: boolean;
  signOutHandler: () => Promise<void>;
};

export const useSignOut = (): SignOutHookReturn => {
  const { onSignOut } = useAuthManager();
  const [signOutMutation, { loading }] = useMutation(SIGN_OUT_MUTATION);

  const signOutHandler = async (): Promise<void> => {
    await signOutMutation();
    await onSignOut();
  };

  return {
    loading,
    signOutHandler,
  };
};
