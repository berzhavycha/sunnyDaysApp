import { env } from "@/core/env";
import { START_PAGE_NUMBER } from "@/shared";

type PaginationParams = {
    page: number;
    limit: number;
    order: "ASC" | "DESC";
    offset: number
}

export const extractPaginationParams = (searchParams: URLSearchParams): PaginationParams => {
    const defaultLimit = env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT;
    const defaultOrder = env.NEXT_PUBLIC_WEATHER_CITIES_ORDER;

    const page = +(searchParams.get('page') ?? START_PAGE_NUMBER);
    const limit = +(searchParams.get('perPage') ?? defaultLimit);
    const order = searchParams.get('order') ?? defaultOrder;
    const offset = (page - 1) * limit;

    return {
        page,
        limit,
        order,
        offset
    }
}