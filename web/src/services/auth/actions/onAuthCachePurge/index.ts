'use server'

import { revalidatePath } from "next/cache"

export const onAuthCachePurge = async (): Promise<void> => {
    revalidatePath('/')
}