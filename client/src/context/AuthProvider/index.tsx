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
import * as SecureStore from 'expo-secure-store';

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

export const useAuth = (): AuthContextType => {
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

  useEffect(() => {
    const loadTokens = async (): Promise<void> => {
      const tokens = await SecureStore.getItemAsync('tokens');

      if (tokens) {
        setAuthState({
          isAuthenticated: true,
        });
        setTokens(JSON.parse(tokens))
      }

    };

    loadTokens();
  }, []);

  const onSignOut = async (): Promise<void> => {
    const tokens = await SecureStore.getItemAsync('tokens');

    if (tokens) {
      setTokens(JSON.parse(tokens))
      await SecureStore.deleteItemAsync('tokens');
    }
    
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
