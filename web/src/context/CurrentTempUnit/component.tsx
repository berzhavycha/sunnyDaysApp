'use client';

import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';

import { TempUnits } from './constants';

type CurrentTempUnitState = {
  name: TempUnits;
};

type ContextType = {
  currentTempUnit: CurrentTempUnitState;
  onTempUnitChange: () => void;
};

const CurrentTempUnitContext = createContext<ContextType | null>(null);

export const useCurrentTempUnit = (): ContextType => {
  const tempUnitContext = useContext(CurrentTempUnitContext);

  if (!tempUnitContext) {
    throw new Error('useCurrentTempUnit must be used within an CurrentTempUnitProvider');
  }

  return tempUnitContext;
};

export const CurrentTempUnitProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentTempUnit, setCurrentTempUnit] = useState<CurrentTempUnitState>({
    name: TempUnits.CELSIUS,
  });

  const onCelsius = (): void => {
    setCurrentTempUnit({
      name: TempUnits.CELSIUS,
    });
  };

  const onFahrenheit = (): void => {
    setCurrentTempUnit({
      name: TempUnits.FAHRENHEIT,
    });
  };

  const onTempUnitChange = currentTempUnit.name === TempUnits.CELSIUS ? onFahrenheit : onCelsius;

  const contextValue: ContextType = {
    currentTempUnit,
    onTempUnitChange,
  };

  return (
    <CurrentTempUnitContext.Provider value={contextValue}>
      {children}
    </CurrentTempUnitContext.Provider>
  );
};
