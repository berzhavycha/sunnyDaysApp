import {
  ApolloClient,
  ApolloError,
  ApolloQueryResult,
  DocumentNode,
  FetchMoreQueryOptions,
  OperationVariables,
} from '@apollo/client';

import { PaginationQueryData, PaginationQueryOptionsState, START_PAGE_NUMBER } from '@/shared';

interface HookReturn<TVariables> {
  onClickPrev: () => Promise<void>;
  onClickNext: () => Promise<void>;
  onGoToPage: (page: number) => Promise<void>;
  isPageContentCached: (variables: Partial<PaginationQueryOptionsState & TVariables>) => boolean;
}

interface UsePaginationDependencies<
  TEdge,
  TData extends Record<string, PaginationQueryData<TEdge> | string>,
  TVariables,
> {
  client: ApolloClient<object>,
  query: DocumentNode;
  queryDataField: string;
  data: TData | null;
  fetchMore: (
    fetchMoreOptions: FetchMoreQueryOptions<OperationVariables, TData>,
  ) => Promise<ApolloQueryResult<TData>>;
  onError: (error: ApolloError) => void;
  paginationOptions: PaginationQueryOptionsState;
  updatePaginationOptions: (newOptions: Partial<PaginationQueryOptionsState | TVariables>) => void;
  currentPage: number;
  onCurrentPageChange: (page: number) => void;
  totalPages: number;
}

export const usePagination = <
  TEdge,
  TData extends Record<string, PaginationQueryData<TEdge> | string>,
  TVariables,
>({
  client,
  query,
  queryDataField,
  data,
  fetchMore,
  onError,
  paginationOptions,
  updatePaginationOptions,
  currentPage,
  onCurrentPageChange,
  totalPages,
}: UsePaginationDependencies<TEdge, TData, TVariables>): HookReturn<TVariables> => {
  const isPageContentCached = (
    variables: Partial<PaginationQueryOptionsState | TVariables>,
  ): boolean => {
    const cachedData = client.cache.readQuery<TData>({
      query: query,
      variables: {
        ...paginationOptions,
        ...variables,
      },
    });

    if (cachedData) {
      const queryFieldData = cachedData?.[queryDataField];
      if (typeof queryFieldData !== 'string' && queryFieldData.edges.length) {
        const isValueCorrect = queryFieldData.edges.some((edge) => !!edge);
        return isValueCorrect;
      }
    }

    return false;
  };

  const onFetchMore = async (
    variables: Partial<PaginationQueryOptionsState | TVariables>,
  ): Promise<void> => {
    try {
      if (!isPageContentCached(variables)) {
        const data = await fetchMore({ variables });
        console.log(data)
      }
      updatePaginationOptions(variables);
    } catch (error) {
      if (error instanceof ApolloError) {
        onError(error);
      }
    }
  };

  const onClickPrev = async (): Promise<void> => {
    if (currentPage !== START_PAGE_NUMBER) {
      await onFetchMore({ offset: paginationOptions.offset - paginationOptions.limit });
      onCurrentPageChange(currentPage - 1);
    }
  };

  const onClickNext = async (): Promise<void> => {
    if (currentPage !== totalPages) {
      const queryFieldData = data?.[queryDataField];
      if (queryFieldData && typeof queryFieldData !== 'string' && queryFieldData.edges) {
        await onFetchMore({ offset: (queryFieldData.edges.length ?? 1) * currentPage });
        onCurrentPageChange(currentPage + 1);
      }
    }
  };

  const onGoToPage = async (page: number): Promise<void> => {
    const offset = (page - 1) * paginationOptions.limit;
    await onFetchMore({ offset, limit: paginationOptions.limit, order: paginationOptions.order });
    onCurrentPageChange(page);
  };

  return { onClickPrev, onClickNext, onGoToPage, isPageContentCached };
};
