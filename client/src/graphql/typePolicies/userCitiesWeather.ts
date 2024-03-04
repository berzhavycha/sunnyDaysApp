import { FieldPolicy } from '@apollo/client';

export const userCitiesWeather: FieldPolicy = {
  merge(existing, incoming, context) {
    const offset = context.args?.offset

    const merged = {
      edges: existing ? [...existing.edges] : [],
      paginationInfo: existing ? { ...existing.paginationInfo } : { totalCount: 0 }
    }

    console.log(incoming)
    for (let i = 0; i < incoming?.edges?.length; ++i) {
      merged.edges[offset + i] = incoming.edges[i];
      merged.paginationInfo = { ...incoming.paginationInfo }
    }

    return {
      edges: merged.edges.filter(edge => !context.readField<boolean>('_deleted', edge)),
      paginationInfo: merged.paginationInfo
    };
  },
  read(existing, context) {
    return existing && {
      edges: existing.edges.slice(context.args?.offset, context.args?.offset + context.args?.limit),
      paginationInfo: { ...existing.paginationInfo }
    };
  },
};