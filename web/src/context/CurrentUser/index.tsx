'use client';

import { usePathname } from 'next/navigation';
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
  fetchUser: () => Promise<void>;
  currentUser: CurrentUserState | null;
  setCurrentUser: Dispatch<SetStateAction<CurrentUserState | null>>;
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
  const pathname = usePathname();

  const fetchUser = async (): Promise<void> => {
    try {
      const userData = await getCurrentUser();
      setCurrentUser(userData.data.currentUser);
    } catch (error) {
      setCurrentUser(null)
    }
  };

  useEffect(() => {
    fetchUser();
  }, [pathname]);

  const contextValue: ContextType = {
    fetchUser,
    currentUser,
    setCurrentUser,
  };

  return <CurrentUserContext.Provider value={contextValue}>{children}</CurrentUserContext.Provider>;
};
