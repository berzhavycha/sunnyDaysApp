import {
  ApolloClient,
  ApolloError,
  ApolloQueryResult,
  DocumentNode,
  FetchMoreQueryOptions,
  OperationVariables,
} from '@apollo/client';

import { Direction, PaginationQueryData, PaginationQueryOptionsState, START_PAGE_NUMBER } from '@/shared';
import { env } from '@/core/env';

interface HookReturn<TVariables> {
  onClickPrev: () => Promise<void>;
  onClickNext: () => Promise<void>;
  onGoToPage: (page: number) => Promise<void>;
  isPageContentCached: (variables: Partial<PaginationQueryOptionsState & TVariables>, direction: Direction) => boolean;
}

interface UsePaginationDependencies<
  TEdge,
  TData extends Record<string, PaginationQueryData<TEdge> | string>,
  TVariables,
> {
  client: ApolloClient<object>;
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
    direction: Direction
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
        if (isValueCorrect) {
          if (direction === Direction.FORWARD) {
            if (currentPage + 1 !== totalPages && queryFieldData.edges.length < env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT) {
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
    direction: Direction
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
      const isFetchSuccess = await onFetchMore({
        offset: paginationOptions.offset - paginationOptions.limit,
      }, Direction.BACKWARD);
      if (isFetchSuccess) {
        onCurrentPageChange(currentPage - 1);
      }
    }
  };

  const onClickNext = async (): Promise<void> => {
    if (currentPage !== totalPages) {
      const queryFieldData = data?.[queryDataField];
      if (queryFieldData && typeof queryFieldData !== 'string' && queryFieldData.edges) {
        const isFetchSuccess = await onFetchMore({
          offset: (queryFieldData.edges.length ?? 1) * currentPage,
        }, Direction.FORWARD);
        if (isFetchSuccess) {
          onCurrentPageChange(currentPage + 1);
        }
      }
    }
  };

  const onGoToPage = async (page: number): Promise<void> => {
    const offset = (page - 1) * paginationOptions.limit;
    const isFetchSuccess = await onFetchMore({
      offset,
      limit: paginationOptions.limit,
      order: paginationOptions.order,
    },
      currentPage < page ? Direction.FORWARD : Direction.BACKWARD
    );
    if (isFetchSuccess) {
      onCurrentPageChange(page);
    }
  };

  return { onClickPrev, onClickNext, onGoToPage, isPageContentCached };
};
