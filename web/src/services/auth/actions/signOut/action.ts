'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getClient } from '@/graphql/utils/getClient';

import { SignOutDocument } from './mutations';

export const signOut = async (): Promise<void> => {
  await getClient().mutate({
    mutation: SignOutDocument,
  });

  cookies().delete('tokens');
  revalidatePath('/');
  redirect('/sign-in');
};
