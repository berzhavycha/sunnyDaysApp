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
  ): Promise<boolean> => {
    try {
      if (!isPageContentCached(variables)) {
        const { errors } = await fetchMore({ variables });

        if (errors?.length) {
          throw new ApolloError(errors[0].extensions);
        }
      }

      updatePaginationOptions(variables);

      return true;
    } catch (error) {
      if (error instanceof ApolloError) {
        onError(error);
      }

      return false;
    }
  };

  const onClickPrev = async (): Promise<void> => {
    if (currentPage !== START_PAGE_NUMBER) {
      const isFetchSuccess = await onFetchMore({ offset: paginationOptions.offset - paginationOptions.limit });
      if (isFetchSuccess) {
        onCurrentPageChange(currentPage - 1);
      }
    }
  };

  const onClickNext = async (): Promise<void> => {
    if (currentPage !== totalPages) {
      const queryFieldData = data?.[queryDataField];
      if (queryFieldData && typeof queryFieldData !== 'string' && queryFieldData.edges) {
        const isFetchSuccess = await onFetchMore({ offset: (queryFieldData.edges.length ?? 1) * currentPage });
        if (isFetchSuccess) {
          onCurrentPageChange(currentPage + 1);
        }
      }
    }
  };

  const onGoToPage = async (page: number): Promise<void> => {
    const offset = (page - 1) * paginationOptions.limit;
    const isFetchSuccess = await onFetchMore({ offset, limit: paginationOptions.limit, order: paginationOptions.order });
    if (isFetchSuccess) {
      onCurrentPageChange(page);
    }
  };

  return { onClickPrev, onClickNext, onGoToPage, isPageContentCached };
};
