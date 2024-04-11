'use client';

import { useApolloClient, useLazyQuery } from '@apollo/client';
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { CurrentUserDocument } from './queries';

type CurrentUserState = {
  email: string;
};

type ContextType = {
  currentUser: CurrentUserState | null;
  setCurrentUser: Dispatch<SetStateAction<CurrentUserState | null>>;
  loadingUser: boolean;
  onSignOut: () => Promise<void>;
};

const CurrentUserContext = createContext<ContextType | null>(null);

export const useCurrentUser = (): ContextType => {
  const userContext = useContext(CurrentUserContext);

  if (!userContext) {
    throw new Error('useCurrentUser must be used within an CurrentUserProvider');
  }

  return userContext;
};

export const CurrentUserProvider: FC<PropsWithChildren> = ({ children }) => {
  const client = useApolloClient();
  const [currentUser, setCurrentUser] = useState<CurrentUserState | null>(null);

  const [fetchUser, { data, loading }] = useLazyQuery(CurrentUserDocument, {
    onCompleted: async () => {
      if (data && data.currentUser) {
        setCurrentUser(data.currentUser);
      }
    },
    errorPolicy: 'all',
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const onSignOut = async (): Promise<void> => {
    setCurrentUser(null);
    await client.clearStore();
  };

  const contextValue: ContextType = {
    currentUser,
    setCurrentUser,
    loadingUser: loading,
    onSignOut,
  };

  return <CurrentUserContext.Provider value={contextValue}>{children}</CurrentUserContext.Provider>;
};
