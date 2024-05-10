import { ApolloError } from '@apollo/client';

type ProcessDataOptions<TData> = {
  jsonResponse: string;
  onSuccess: (data: TData) => void;
  onError: (error: ApolloError) => void;
};

export const processResponse = <TData>({
  jsonResponse,
  onSuccess,
  onError,
}: ProcessDataOptions<TData>): void => {
  try {
    const { responseData, error } = JSON.parse(jsonResponse);

    if (responseData) {
      const { data, errors } = responseData;

      if (errors?.length) {
        throw new ApolloError({ graphQLErrors: errors });
      }

      if (data) {
        onSuccess(data);
      }
    } else if (error) {
      throw new ApolloError({ graphQLErrors: [error] });
    }
  } catch (error) {
    if (error instanceof ApolloError) {
      onError(error);
    }
  }
};
