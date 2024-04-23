'use client';

import { ApolloError } from '@apollo/client';
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import { UNEXPECTED_ERROR_MESSAGE } from '@/graphql';
import { OriginalError } from '@/shared';

type SubscriptionErrorState = {
  message: string;
};

type ContextType = {
  error: SubscriptionErrorState;
  setError: Dispatch<SetStateAction<SubscriptionErrorState>>;
  errorHandler: (error: ApolloError | Error) => void;
};

const SubscriptionErrorContext = createContext<ContextType | null>(null);

export const useSubscriptionError = (): ContextType => {
  const subscriptionErrorContext = useContext(SubscriptionErrorContext);

  if (!subscriptionErrorContext) {
    throw new Error('useSubscriptionError must be used within an SubscriptionErrorProvider');
  }

  return subscriptionErrorContext;
};

export const SubscriptionErrorProvider: FC<PropsWithChildren> = ({ children }) => {
  const [error, setError] = useState<SubscriptionErrorState>({
    message: '',
  });

  const errorHandler = (error: ApolloError | Error): void => {
    if (error instanceof ApolloError && error.graphQLErrors[0]?.extensions.originalError) {
      // Use type assertion to access the 'message' property.
      // TypeScript infers the type of 'extensions' keys as 'unknown',
      // so we need to assert the type to access specific properties.
      const originalErrorMessage = (
        error.graphQLErrors[0].extensions.originalError as OriginalError
      ).message;
      setError({ message: originalErrorMessage });
    } else {
      setError({ message: UNEXPECTED_ERROR_MESSAGE });
    }
  };

  const contextValue: ContextType = {
    error,
    setError,
    errorHandler,
  };

  return (
    <SubscriptionErrorContext.Provider value={contextValue}>
      {children}
    </SubscriptionErrorContext.Provider>
  );
};
