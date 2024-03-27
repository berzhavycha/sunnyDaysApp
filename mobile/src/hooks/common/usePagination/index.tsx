import {
  ApolloClient,
  ApolloError,
  ApolloQueryResult,
  DocumentNode,
  FetchMoreQueryOptions,
  OperationVariables,
} from '@apollo/client';

import {
  Direction,
  PaginationQueryData,
  PaginationQueryOptionsState,
  START_PAGE_NUMBER,
} from '@/shared';

interface HookReturn<TVariables> {
  onClickPrev: () => Promise<void>;
  onClickNext: () => Promise<void>;
  onGoToPage: (page: number) => Promise<void>;
  isPageContentCached: (
    variables: Partial<PaginationQueryOptionsState & TVariables>,
    direction: Direction,
  ) => boolean;
}

interface UsePaginationDependencies<
  TEdge,
  TData extends Record<string, PaginationQueryData<TEdge> | string>,
  TVariables,
> {
  client: ApolloClient<object>;
  query: DocumentNode;
  queryDataField: string;
  data: TData | undefined;
  fetchMore: (
    fetchMoreOptions: FetchMoreQueryOptions<OperationVariables, TData | undefined>,
  ) => Promise<ApolloQueryResult<TData | undefined>>;
  onError: (error: ApolloError) => void;
  paginationOptions: PaginationQueryOptionsState;
  updatePaginationOptions: (newOptions: Partial<PaginationQueryOptionsState | TVariables>) => void;
  currentPage: number;
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
  totalPages,
}: UsePaginationDependencies<TEdge, TData, TVariables>): HookReturn<TVariables> => {
  const isPageContentCached = (
    variables: Partial<PaginationQueryOptionsState | TVariables>,
    direction: Direction,
  ): boolean => {
    const queryVariables = {
      ...paginationOptions,
      ...variables,
    };

    const cachedData = client.cache.readQuery<TData>({
      query,
      variables: queryVariables,
    });

    if (cachedData) {
      const queryFieldData = cachedData?.[queryDataField];
      if (typeof queryFieldData !== 'string' && queryFieldData.edges.length) {
        const isValueCorrect = queryFieldData.edges.some((edge) => !!edge);
        if (isValueCorrect) {
          if (direction === Direction.FORWARD) {
            if (
              Math.ceil(queryVariables.offset / queryVariables.limit + 1) !== totalPages &&
              queryFieldData.edges.length < paginationOptions.limit
            ) {
              return false;
            }
          }
          return true;
        }
      }
    }

    return false;
  };

  const onFetchMore = async (
    variables: Partial<PaginationQueryOptionsState | TVariables>,
    direction: Direction,
  ): Promise<boolean> => {
    try {
      if (!isPageContentCached(variables, direction)) {
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
      await onFetchMore(
        {
          offset: paginationOptions.offset - paginationOptions.limit,
        },
        Direction.BACKWARD,
      );
    }
  };

  const onClickNext = async (): Promise<void> => {
    if (currentPage !== totalPages) {
      const queryFieldData = data?.[queryDataField];
      if (queryFieldData && typeof queryFieldData !== 'string' && queryFieldData.edges) {
        await onFetchMore(
          {
            offset: (queryFieldData.edges.length ?? 1) * currentPage,
          },
          Direction.FORWARD,
        );
      }
    }
  };

  const onGoToPage = async (page: number): Promise<void> => {
    const offset = (page - 1) * paginationOptions.limit;
    await onFetchMore({ offset }, currentPage < page ? Direction.FORWARD : Direction.BACKWARD);
  };

  return { onClickPrev, onClickNext, onGoToPage, isPageContentCached };
};
