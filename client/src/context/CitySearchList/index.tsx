import { FC, createContext, PropsWithChildren, useState, useContext } from 'react';

import { useCitySearchStatus } from '@/hooks/citySearch';

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
  const { isEnabled } = useCitySearchStatus();

  const [listState, setListState] = useState<CitySearchListState>({
    isVisible: false,
    isEnabled
  });

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
