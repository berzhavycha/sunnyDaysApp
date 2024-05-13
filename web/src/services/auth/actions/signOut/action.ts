'use server'

import { getClient } from "@/graphql/utils/getClient"
import { SignOutDocument } from "./mutations"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation';

export const signOut = async (): Promise<void> => {
    await getClient().mutate({
        mutation: SignOutDocument
    })

    cookies().delete('tokens')
    revalidatePath('/');
    redirect('/sign-in')
}