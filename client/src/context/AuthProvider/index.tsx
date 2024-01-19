import {
  FC,
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
  useContext,
  useEffect,
} from "react";
import * as SecureStore from "expo-secure-store";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  authenticated: boolean;
}

interface AuthContextType {
  authState: AuthState;
  getAccessToken: () => string | null;
  setAuthState: Dispatch<SetStateAction<AuthState>>;
  onLogout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authContext;
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    refreshToken: null,
    authenticated: false,
  });

  useEffect(() => {
    const loadTokens = async (): Promise<void> => {
      const tokens = await SecureStore.getItemAsync("tokens");

      if (tokens) {
        const { accessToken, refreshToken } = JSON.parse(tokens);

        setAuthState({
          accessToken,
          refreshToken,
          authenticated: true,
        });
      }
    };

    // loadTokens();
  }, []);

  const onLogout = async (): Promise<void> => {
    await SecureStore.deleteItemAsync("tokens");

    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });
  };

  const getAccessToken = (): string | null => {
    return authState.accessToken;
  };

  const contextValue: AuthContextType = {
    authState,
    getAccessToken,
    setAuthState,
    onLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
