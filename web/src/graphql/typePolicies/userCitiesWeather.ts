import { FieldPolicy } from '@apollo/client';

import { WeatherForecast } from '@/hooks';

interface PageInfo {
  totalCount: number;
}

interface PaginationResult {
  edges: WeatherForecast[];
  paginationInfo: PageInfo;
}

export const userCitiesWeather: FieldPolicy<PaginationResult> = {
  merge(existing, incoming, context) {
    console.log("EXISTING", existing)
    const offset = context.args?.offset;

    const mergedEdges = existing ? [...existing.edges] : [];
    let mergedPaginationInfo = existing ? { ...existing.paginationInfo } : { totalCount: 0 };

    incoming?.edges?.forEach((edge, index) => {
      mergedEdges[offset + index] = edge;
    });

    mergedPaginationInfo = { ...incoming.paginationInfo };

    return {
      edges: [...mergedEdges].filter((edge) => {
        // return true for undefined values in the mergedEdges in case user skipped some pages, so we don`t filter out
        // the gap between pages
        if (edge === undefined) {
          return true;
        }
        return !context.readField<boolean>('_deleted', edge);
      }),
      paginationInfo: { ...mergedPaginationInfo },
    };
  },
  read(existing, context) {
    return (
      existing && {
        edges: existing.edges.slice(
          context.args?.offset,
          context.args?.offset + context.args?.limit,
        ),
        paginationInfo: { ...existing.paginationInfo },
      }
    );
  },
};
