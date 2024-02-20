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

  const contextValue: ContextType = {
    error,
    setError,
  };

  return (
    <SubscriptionErrorContext.Provider value={contextValue}>
      {children}
    </SubscriptionErrorContext.Provider>
  );
};
