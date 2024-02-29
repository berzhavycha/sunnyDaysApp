import { UNEXPECTED_ERROR_MESSAGE } from '@/graphql';
import { ApolloError } from '@apollo/client';
import {
  FC,
  createContext,
  PropsWithChildren,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

type SubscriptionErrorState = {
  message: string;
};

type ContextType = {
  error: SubscriptionErrorState;
  setError: Dispatch<SetStateAction<SubscriptionErrorState>>;
  handleError: (error: ApolloError) => void;
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

  const handleError = (error: ApolloError): void => {
    if (error.graphQLErrors[0]?.extensions.originalError) {
      setError({ message: error.graphQLErrors[0].extensions.originalError.message });
    } else {
      setError({ message: UNEXPECTED_ERROR_MESSAGE });
    }
  };

  const contextValue: ContextType = {
    error,
    setError,
    handleError,
  };

  return (
    <SubscriptionErrorContext.Provider value={contextValue}>
      {children}
    </SubscriptionErrorContext.Provider>
  );
};
