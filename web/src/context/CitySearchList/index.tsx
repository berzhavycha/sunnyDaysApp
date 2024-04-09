'use client';

import { ApolloQueryResult } from '@apollo/client';
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { CitySearchStatusQuery } from '@/services';

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

type Props = PropsWithChildren & {
  citySearchStatusData: ApolloQueryResult<CitySearchStatusQuery>;
};

export const CitySearchListProvider: FC<Props> = ({ children, citySearchStatusData }) => {
  const [listState, setListState] = useState<CitySearchListState>({
    isVisible: false,
    isEnabled: false,
  });

  useEffect(() => {
    setListState((prevState) => ({
      ...prevState,
      isEnabled: citySearchStatusData.data.citySearchStatus ?? false,
    }));
  }, [citySearchStatusData]);

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
