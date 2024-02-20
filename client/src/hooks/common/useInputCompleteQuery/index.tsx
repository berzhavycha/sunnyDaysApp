import { ApolloError, DocumentNode, OperationVariables, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';

type HookReturn<TItem> = {
  loading: boolean;
  data: TItem[];
  error?: ApolloError;
};

export const useInputCompleteQuery = <
  TData,
  TItem,
  TVariables extends OperationVariables | undefined,
>(
  query: DocumentNode,
  searchInput: string,
  variables: TVariables,
  extractData: (data: TData) => TItem[],
): HookReturn<TItem> => {
  const [getItems, { loading, data, error }] = useLazyQuery(query);

  useEffect(() => {
    if (searchInput.trim() !== '') {
      getItems({
        variables,
      });
    }
  }, [searchInput, getItems]);

  return {
    loading,
    data: extractData(data),
    error,
  };
};
