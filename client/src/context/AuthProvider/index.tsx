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
  isAuthenticated: boolean;
}

interface AuthContextType {
  authState: AuthState;
  setAuthState: Dispatch<SetStateAction<AuthState>>;
  onSignOut: () => void;
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
    isAuthenticated: false,
  });

  useEffect(() => {
    const loadTokens = async (): Promise<void> => {
      const tokens = await SecureStore.getItemAsync("tokens");

      if (tokens) {
        const { accessToken, refreshToken } = JSON.parse(tokens);

        setAuthState({
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      }
    };

    // loadTokens();
  }, []);

  const onSignOut = async (): Promise<void> => {
    await SecureStore.deleteItemAsync("tokens");

    setAuthState({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  };

  const contextValue: AuthContextType = {
    authState,
    setAuthState,
    onSignOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
