import { useLazyQuery } from '@apollo/client';
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
import { IS_USER_SIGNED_IN } from './queries'; 

interface ITokens {
  accessToken: string,
  refreshToken: string
}

interface AuthState {
  isAuthenticated: boolean;
}

interface AuthContextType {
  authState: AuthState;
  setAuthState: Dispatch<SetStateAction<AuthState>>;
  onSignOut: () => void;
  tokens: ITokens | null,
  setTokens: Dispatch<SetStateAction<ITokens | null>>
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
  const [tokens, setTokens] = useState<ITokens | null>(null);
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
  });

  const [fetchUser, { data }] = useLazyQuery(IS_USER_SIGNED_IN, {
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
  };

  const contextValue: AuthContextType = {
    authState,
    setAuthState,
    onSignOut,
    tokens,
    setTokens
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};