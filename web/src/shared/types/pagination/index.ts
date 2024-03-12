export interface PaginationInfo {
  totalCount: number;
}

export interface PaginationQueryData<TEdge> {
  edges: TEdge[];
  paginationInfo: PaginationInfo;
}

export type PaginationQueryOptionsState = {
  offset: number;
  limit: number;
  order: string;
};
