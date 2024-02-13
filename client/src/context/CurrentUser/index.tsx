import { useLazyQuery, useApolloClient } from '@apollo/client';
import {
  FC,
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
  useContext,
  useEffect,
} from 'react';

import { CurrentUserDocument } from './queries';

interface CurrentUserState {
  email: string;
}

interface CurrentUserContextType {
  currentUser: CurrentUserState | null;
  setCurrentUser: Dispatch<SetStateAction<CurrentUserState | null>>;
  onSignOut: () => Promise<void>;
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

export const useCurrentUser = (): CurrentUserContextType => {
  const userContext = useContext(CurrentUserContext);

  if (!userContext) {
    throw new Error('useCurrentUser must be used within an AuthProvider');
  }

  return userContext;
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const client = useApolloClient();
  const [currentUser, setCurrentUser] = useState<CurrentUserState | null>(null);

  const [fetchUser, { data }] = useLazyQuery(CurrentUserDocument, {
    onCompleted: () => {
      if (data && data.currentUser) {
        setCurrentUser(data.currentUser)
      }
    },
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const onSignOut = async (): Promise<void> => {
    setCurrentUser(null)
    client.clearStore();
  };

  const contextValue: CurrentUserContextType = {
    currentUser,
    setCurrentUser,
    onSignOut,
  };

  return <CurrentUserContext.Provider value={contextValue}>{children}</CurrentUserContext.Provider>;
};
