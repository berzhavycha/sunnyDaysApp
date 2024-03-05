import { FieldPolicy } from '@apollo/client';

import { WeatherForecast } from '@/hooks';

interface PageInfo {
  totalCount: number;
}

interface PaginationResult {
  edges: (WeatherForecast | { _deleted: boolean })[];
  paginationInfo: PageInfo;
}

const isPageGap = <T>(edges: T[]): boolean => {
  return !edges.some(edge => edge !== undefined)
}

export const userCitiesWeather: FieldPolicy<PaginationResult> = {
  merge(existing, incoming, context) {
    const offset = context.args?.offset;

    let mergedEdges = existing ? [...existing.edges] : [];
    let mergedPaginationInfo = existing ? { ...existing.paginationInfo } : { totalCount: 0 };

    incoming?.edges?.forEach((edge, index) => {
      mergedEdges[offset + index] = edge;
    });

    if (!isPageGap(mergedEdges.slice(offset, offset + context.args?.limit))) {
      mergedEdges = mergedEdges.map(edge => {
        if (edge === undefined) {
          return { _deleted: true }
        }

        return edge
      })
    }

    mergedPaginationInfo = { ...incoming.paginationInfo };

    console.log(mergedEdges.map(edge => context.readField<boolean>('city', edge)))
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
