'use client';

import Cookies from 'js-cookie';
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { env } from '@/core/env';

import { TempUnits } from './constants';
import { NODE_ENV } from '@/shared';

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

type Props = PropsWithChildren & {
  cookieTempUnit?: TempUnits;
};

export const CurrentTempUnitProvider: FC<Props> = ({ children, cookieTempUnit }) => {
  const [currentTempUnit, setCurrentTempUnit] = useState<CurrentTempUnitState>({
    name: cookieTempUnit ?? TempUnits.CELSIUS,
  });

  useEffect(() => {
    Cookies.set('current-temp-unit', currentTempUnit.name, {
      expires: env.NEXT_PUBLIC_TEMP_UNIT_COOKIE_EXPIRATION_DAYS_TIME,
      sameSite: 'lax',
      secure: env.NODE_ENV === NODE_ENV.production,
    });
  }, [currentTempUnit]);

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
