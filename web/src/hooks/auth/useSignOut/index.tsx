'use client';

import { useRouter } from 'next/navigation';

import { useCurrentUser } from '@/context';
import { signOut } from '@/services';
import { ApolloError } from '@apollo/client';

type HookReturn = {
  signOutHandler: () => Promise<void>;
};

export const useSignOut = (): HookReturn => {
  const router = useRouter();

  const { onSignOut } = useCurrentUser();

  const signOutHandler = async (): Promise<void> => {
    await onSignOut();
    const { errors } = await signOut()

    if (errors) {
      throw new ApolloError({ graphQLErrors: errors })
    }

    router.replace('/sign-in');
  };

  return {
    signOutHandler,
  };
};
