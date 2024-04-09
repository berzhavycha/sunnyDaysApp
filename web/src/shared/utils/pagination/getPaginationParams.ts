import { START_PAGE_NUMBER } from "@/shared/constants";
import { PaginationQueryOptionsState } from "@/shared/types";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { headers } = require('next/headers');

export const getPaginationParams = (): PaginationQueryOptionsState => {
    const url = new URL(headers().get('x-url'));
    const searchParams = url.searchParams;

    const page = +(searchParams.get('page') ?? START_PAGE_NUMBER)
    const limit = +(searchParams.get('perPage') ?? 6)
    const order = searchParams.get('order') ?? "ASC"

    const paginationOptions: PaginationQueryOptionsState = {
        offset: (page - 1) * limit,
        limit,
        order
    }

    return paginationOptions
}