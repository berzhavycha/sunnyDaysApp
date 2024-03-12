import { FieldPolicy } from '@apollo/client';

import { WeatherForecast } from '@/hooks';
import { PaginationQueryData } from '@/shared';

export type WeatherForecastEdge = WeatherForecast | { _deleted: boolean };

const isPageGap = (edges: WeatherForecastEdge[]): boolean => {
  return !edges?.some((edge) => !!edge);
};

export const userCitiesWeather: FieldPolicy<PaginationQueryData<WeatherForecastEdge>> = {
  merge(existing, incoming, context) {
    const offset = context.args?.offset;
    const limit = context.args?.limit;

    let mergedEdges = existing ? [...existing.edges] : [];
    const mergedPaginationInfo = existing
      ? { ...existing.paginationInfo }
      : { ...incoming.paginationInfo };

    incoming?.edges?.forEach((edge, index) => {
      mergedEdges[offset + index] = edge;
    });

    // if it is not a page gap we have to delete all undefined values on the page to clear space for
    // elements from the next page
    if (!isPageGap(mergedEdges.slice(offset, offset + limit))) {
      mergedEdges = mergedEdges.map((edge, index) => {
        if (index > offset && index < offset + limit && !edge) {
          return { _deleted: true };
        }

        return edge;
      });
    }

    const filteredMergedEdge = [...mergedEdges].filter((edge) => {
      // return true for undefined values in the mergedEdges in case user skipped some pages, so we don`t
      // filter out the gap between pages
      if (!edge) {
        return true;
      }

      // we should check whether edge has city value before decreasing totalCount,
      // because if it is just {_deleted: true} object we don`t want to decrease totalCount
      // twice on the same deleted object
      if (
        context.readField<boolean>('_deleted', edge) &&
        context.readField<boolean>('city', edge)
      ) {
        mergedPaginationInfo.totalCount--;
      }

      return !context.readField<boolean>('_deleted', edge);
    });

    return {
      edges: filteredMergedEdge,
      paginationInfo: mergedPaginationInfo,
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
