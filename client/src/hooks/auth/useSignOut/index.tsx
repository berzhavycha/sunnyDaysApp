import { useMutation } from '@apollo/client';
import { useAuth } from '@/context';
import { SIGN_OUT_MUTATION } from '@/apollo';

export type SignOutHookReturnType = {
    loading: boolean;
    signOutHandler: () => Promise<void>;
};

export const useSignOut = (): SignOutHookReturnType => {
    const { authState, onSignOut } = useAuth();
    const [signOutMutation, { loading }] = useMutation(SIGN_OUT_MUTATION, {
        variables: {
            authorization: `Bearer ${authState.accessToken}`,
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
