import {
  FC,
  createContext,
  PropsWithChildren,
  useState,
  useContext,
} from 'react';

type CitySearchListState = {
  isShown: boolean
}

type ContextType = {
  listState: CitySearchListState;
  onPressOutside: () => void
  onInputFocus: () => void
}

const CitySearchListContext = createContext<ContextType | null>(null);

export const useCitySearchList = (): ContextType => {
  const citySearchContext = useContext(CitySearchListContext);

  if (!citySearchContext) {
    throw new Error('useCitySearchList must be used within an CitySearchListProvider');
  }

  return citySearchContext;
};

export const CitySearchListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [listState, setListState] = useState<CitySearchListState>({
    isShown: false
  })

  const onPressOutside = (): void => {
    setListState(prevState => ({
      ...prevState,
      isShown: false
    }))
  };

  const onInputFocus = (): void => {
    setListState(prevState => ({
      ...prevState,
      isShown: true
    }))
  };

  const contextValue: ContextType = {
    listState,
    onPressOutside,
    onInputFocus
  };

  return <CitySearchListContext.Provider value={contextValue}>{children}</CitySearchListContext.Provider>;
};
