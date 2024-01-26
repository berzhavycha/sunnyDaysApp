import { useMutation } from '@apollo/client';
import { useAuthManager } from '@/context';
import { SIGN_OUT_MUTATION } from './mutations';

export type SignOutHookReturnType = {
    loading: boolean;
    signOutHandler: () => Promise<void>;
};

export const useSignOut = (): SignOutHookReturnType => {
    const { tokens, onSignOut } = useAuthManager();
    const [signOutMutation, { loading }] = useMutation(SIGN_OUT_MUTATION, {
        variables: {
            authorization: `Bearer ${tokens?.accessToken}`,
        },
    });

    const signOutHandler = async (): Promise<void> => {
        await signOutMutation();
        await onSignOut();
    };

    return {
        loading,
        signOutHandler,
    };
};
