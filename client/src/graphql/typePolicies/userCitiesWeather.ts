import { FieldPolicy } from '@apollo/client';

export const userCitiesWeather: FieldPolicy = {
  merge(existing, incoming, context) {
    const offset = context.args?.offset

    const merged = {
      edges: existing ? [...existing.edges] : [],
      paginationInfo: existing ? { ...existing.paginationInfo } : { totalCount: 0 }
    }

    for (let i = 0; i < incoming?.edges?.length; ++i) {
      merged.edges[offset + i] = incoming.edges[i];
      merged.paginationInfo = { ...incoming.paginationInfo }
    }

    merged.edges = Array.from({ length: merged.edges.length }, (_, index) =>
      merged.edges[index] !== undefined ? merged.edges[index] : {}
    );

    const res = {
      edges: [...merged.edges].filter(edge => !context.readField<boolean>('_deleted', edge)),
      paginationInfo: { ...merged.paginationInfo }
    };

    res.edges = Array.from({ length: res.edges.length }, (_, index) =>
      JSON.stringify(res.edges[index]) === "{}" ? undefined : res.edges[index]
    );

    console.log(res.edges.map(edge => context.readField<string>('city', edge ?? {})))
    return res
  },
  read(existing, context) {
    return existing && {
      edges: existing.edges.slice(context.args?.offset, context.args?.offset + context.args?.limit),
      paginationInfo: { ...existing.paginationInfo }
    };
  },
};