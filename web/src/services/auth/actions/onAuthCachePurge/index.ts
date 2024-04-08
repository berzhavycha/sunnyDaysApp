'use server'

import { revalidatePath } from "next/cache"

export const onAuthCachePurge = async (): Promise<{message: string}> => {
    console.log('revalidate')
    revalidatePath('/')

    return { message: 'string' }
}