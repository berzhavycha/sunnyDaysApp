import { extractPaginationParams } from "@/shared";
import { NextRequest } from "next/server";

export const redirectToWeatherForecast = (request: NextRequest, searchParams: URLSearchParams): void => {
    const { page, limit, order } = extractPaginationParams(searchParams)
  
    request.headers.set(
      'redirect',
      `/weather-forecast?page=${page}&perPage=${limit}&order=${order}`,
    );
  };