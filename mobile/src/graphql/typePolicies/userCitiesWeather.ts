import { FieldPolicy } from '@apollo/client';

import { WeatherForecast } from '@/hooks';

interface PageInfo {
  totalCount: number;
}

interface PaginationResult {
  edges: (WeatherForecast | { _deleted: boolean })[];
  paginationInfo: PageInfo;
}


export const userCitiesWeather: FieldPolicy<PaginationResult> = {
  merge(existing, incoming, context) {
    const offset = context.args?.offset;

    const mergedEdges = existing ? [...existing.edges] : [];
    let mergedPaginationInfo = existing ? { ...existing.paginationInfo } : { totalCount: 0 };

    incoming?.edges?.forEach((edge, index) => {
      mergedEdges[offset + index] = edge;
    });

    mergedPaginationInfo = !incoming.edges.length ? { ...mergedPaginationInfo } : {
      ...incoming.paginationInfo
    };

    const filteredMergedEdge = [...mergedEdges].filter((edge) => {
      // return empty element for undefined values in the mergedEdges in case user skipped some pages, so we don`t 
      //filter out the gap between pages
      if (!edge) {
        return true;
      }
      return !context.readField<boolean>('_deleted', edge);
    })

    return {
      edges: filteredMergedEdge,
      paginationInfo: {
        ...mergedPaginationInfo,
        totalCount: mergedPaginationInfo.totalCount - (mergedEdges.length - filteredMergedEdge.length)
      },
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
