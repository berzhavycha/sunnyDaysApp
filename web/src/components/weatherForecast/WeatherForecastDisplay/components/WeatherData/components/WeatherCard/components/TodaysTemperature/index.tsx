'use client';

import { FC } from 'react';

import { TemperatureInfo } from '@/components/common';
import { tempUnitSigns, useCurrentTempUnit } from '@/context';

type Props = {
  celsius: number;
  fahrenheit: number;
};

export const TodaysTemperature: FC<Props> = ({ ...info }) => {
  const { currentTempUnit } = useCurrentTempUnit();

  return (
    <TemperatureInfo
      value={info[currentTempUnit.name]}
      tempSign={tempUnitSigns[currentTempUnit.name]}
      size="medium"
      fontWeight="normal"
    />
  );
};
