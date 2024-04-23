'use client';

import { FC } from 'react';

import { FontWeight, Size, TemperatureInfo } from '@/components/common';
import { tempUnitSigns, useCurrentTempUnit } from '@/context';

type Props = {
  size: Size;
  fontWeight: FontWeight;
  celsius: number;
  fahrenheit: number;
};

export const ClientTemperatureInfo: FC<Props> = ({ size, fontWeight, ...info }) => {
  const { currentTempUnit } = useCurrentTempUnit();

  return (
    <TemperatureInfo
      value={info[currentTempUnit.name]}
      tempSign={tempUnitSigns[currentTempUnit.name]}
      size={size}
      fontWeight={fontWeight}
    />
  );
};
