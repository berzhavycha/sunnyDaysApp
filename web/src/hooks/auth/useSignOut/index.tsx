'use client';

import { useRouter } from 'next/navigation';

import { useCurrentUser, useSubscriptionError } from '@/context';
import { signOut } from '@/services';
import { ApolloError } from '@apollo/client';

type HookReturn = {
  signOutHandler: () => Promise<void>;
};

export const useSignOut = (): HookReturn => {
  const { onSignOut } = useCurrentUser();
  const { errorHandler } = useSubscriptionError()
  const router = useRouter();

  const signOutHandler = async (): Promise<void> => {
    try {
      await onSignOut();
      const { errors } = await signOut()

      if (errors) {
        throw new ApolloError({ graphQLErrors: errors })
      }

      router.replace('/sign-in');
    } catch (error) {
      if (error instanceof ApolloError) {
        errorHandler(error)
      }
    }
  };

  return {
    signOutHandler,
  };
};
