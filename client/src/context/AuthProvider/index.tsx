import {
  FC,
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
  useContext,
} from "react";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthContextType {
  authState: AuthState;
  getAccessToken: () => string | null;
  setAuthState: Dispatch<SetStateAction<AuthState>>;
  logout: () => void;
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
  });

  const logout = async (): Promise<void> => {
    setAuthState({
      accessToken: null,
      refreshToken: null,
    });
  };

  const getAccessToken = (): string | null => {
    return authState.accessToken;
  };

  const contextValue: AuthContextType = {
    authState,
    getAccessToken,
    setAuthState,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
