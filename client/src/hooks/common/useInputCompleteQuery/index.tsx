import { ApolloError, DocumentNode, OperationVariables, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';

type UseInputCompleteQueryResult<TItem> = {
  loading: boolean;
  data: TItem[];
  error?: ApolloError | undefined;
};

export const useInputCompleteQuery = <
  TData,
  TItem,
  TVariables extends OperationVariables | undefined,
>(
  query: DocumentNode,
  searchInput: string,
  variables: TVariables,
  context: { clientName: string },
  extractData: (data: TData) => TItem[],
): UseInputCompleteQueryResult<TItem> => {
  const [getItems, { loading, data, error }] = useLazyQuery(query);

  useEffect(() => {
    if (searchInput.trim() !== '') {
      getItems({
        variables,
        context,
      });
    }
  }, [searchInput, getItems]);

  return {
    loading,
    data: extractData(data) ?? [],
    error,
  };
};
