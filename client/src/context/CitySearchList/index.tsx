import {
  FC,
  createContext,
  PropsWithChildren,
  useState,
  useContext,
} from 'react';

interface CitySearchListState {
  isShown: boolean
}

interface CitySearchListContextType {
  citySearchList: CitySearchListState;
  onPressOutside: () => void
  onInputFocus: () => void
}

const CitySearchListContext = createContext<CitySearchListContextType | null>(null);

export const useCitySearchList = (): CitySearchListContextType => {
  const citySearchContext = useContext(CitySearchListContext);

  if (!citySearchContext) {
    throw new Error('useCitySearchList must be used within an CitySearchListProvider');
  }

  return citySearchContext;
};

export const CitySearchListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [citySearchList, setCitySearchList] = useState<CitySearchListState>({
    isShown: false
  })

  const onPressOutside = (): void => {
    setCitySearchList(prevState => ({
      ...prevState,
      isShown: false
    }))
  };

  const onInputFocus = (): void => {
    setCitySearchList(prevState => ({
      ...prevState,
      isShown: true
    }))
  };

  const contextValue: CitySearchListContextType = {
    citySearchList,
    onPressOutside,
    onInputFocus
  };

  return <CitySearchListContext.Provider value={contextValue}>{children}</CitySearchListContext.Provider>;
};
