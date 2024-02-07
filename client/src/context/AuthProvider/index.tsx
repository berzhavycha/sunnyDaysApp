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

import { IsUserSignedInDocument } from './queries';

interface AuthState {
  isAuthenticated: boolean;
}

interface AuthContextType {
  authState: AuthState;
  setAuthState: Dispatch<SetStateAction<AuthState>>;
  onSignOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthManager = (): AuthContextType => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return authContext;
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const client = useApolloClient();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
  });

  console.log(authState);

  const [fetchUser, { data }] = useLazyQuery(IsUserSignedInDocument, {
    onCompleted: () => {
      if (data && data.isUserSignedIn) {
        setAuthState({
          isAuthenticated: true,
        });
      }
    },
  });

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const onSignOut = async (): Promise<void> => {
    setAuthState({
      isAuthenticated: false,
    });
    client.clearStore();
  };

  const contextValue: AuthContextType = {
    authState,
    setAuthState,
    onSignOut,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
