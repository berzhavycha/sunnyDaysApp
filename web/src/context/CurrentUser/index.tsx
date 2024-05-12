'use client';

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

import { getCurrentUser } from '@/services';

export type CurrentUserState = {
  email: string;
};

type ContextType = {
  fetchUser: () => Promise<void>,
  currentUser: CurrentUserState | null;
  setCurrentUser: Dispatch<SetStateAction<CurrentUserState | null>>;
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
  const [currentUser, setCurrentUser] = useState<CurrentUserState | null>(null);

  const fetchUser = async (): Promise<void> => {
    const userData = await getCurrentUser();
    setCurrentUser(userData.data.currentUser);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onSignOut = async (): Promise<void> => {
    setCurrentUser(null);
  };

  const contextValue: ContextType = {
    fetchUser,
    currentUser,
    setCurrentUser,
    onSignOut,
  };

  return <CurrentUserContext.Provider value={contextValue}>{children}</CurrentUserContext.Provider>;
};
