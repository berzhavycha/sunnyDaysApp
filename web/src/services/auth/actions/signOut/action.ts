'use server'

import { getClient } from "@/graphql/utils/getClient"
import { SignOutDocument, SignOutMutation } from "./mutations"
import { cookies } from "next/headers"
import { FetchResult } from "@apollo/client"
import { revalidatePath } from "next/cache"

export const signOut = async (): Promise<FetchResult<SignOutMutation>> => {
    const data = await getClient().mutate({
        mutation: SignOutDocument
    })

    if (!data.errors?.length) {
        cookies().delete('tokens')
    }

    revalidatePath('/');

    return data
}