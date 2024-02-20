import { FC, createContext, PropsWithChildren, useState, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { Env } from '@/env';
import { getFetchPolicyForKey, ONE_MINUTE } from '@/utils';
import { CitySearchStatusDocument } from '@/context/CitySearchList/queries';

type CitySearchListState = {
  isVisible: boolean;
  isEnabled: boolean;
};

type ContextType = {
  listState: CitySearchListState;
  onPressOutside: () => void;
  onInputFocus: () => void;
};

const CitySearchListContext = createContext<ContextType | null>(null);

export const useCitySearchList = (): ContextType => {
  const citySearchListContext = useContext(CitySearchListContext);

  if (!citySearchListContext) {
    throw new Error('useCitySearchList must be used within an CitySearchListProvider');
  }

  return citySearchListContext;
};

export const CitySearchListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [listState, setListState] = useState<CitySearchListState>({
    isVisible: false,
    isEnabled: false,
  });

  const { data, loading } = useQuery(CitySearchStatusDocument, {
    fetchPolicy: getFetchPolicyForKey(
      'citySearchStatus',
      ONE_MINUTE * Env.FEATURE_CACHE_MINUTES_TIME,
    ),
  });

  useEffect(() => {
    if (data) {
      setListState((prevState) => ({
        ...prevState,
        isEnabled: data.citySearchStatus,
      }));
    }
  }, [data, loading]);

  const onPressOutside = (): void => {
    setListState((prevState) => ({
      ...prevState,
      isVisible: false,
    }));
  };

  const onInputFocus = (): void => {
    setListState((prevState) => ({
      ...prevState,
      isVisible: true,
    }));
  };

  const contextValue: ContextType = {
    listState,
    onPressOutside,
    onInputFocus,
  };

  return (
    <CitySearchListContext.Provider value={contextValue}>{children}</CitySearchListContext.Provider>
  );
};
