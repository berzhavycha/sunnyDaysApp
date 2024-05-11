import { ApolloError } from '@apollo/client';

type ProcessDataOptions<TData> = {
  jsonResponse: string;
  onSuccess: (data: TData) => void;
  onError?: (error: ApolloError) => void;
};

export const processResponse = <TData>({
  jsonResponse,
  onSuccess,
  onError,
}: ProcessDataOptions<TData>): void => {
  try {
    const { data, errors } = JSON.parse(jsonResponse);

    if (data) {
      onSuccess(data);
    } else if (errors?.length) {
      throw new ApolloError({ graphQLErrors: errors });
    }
  } catch (error) {
    if (error instanceof ApolloError && onError) {
      onError(error);
    }
  }
};
