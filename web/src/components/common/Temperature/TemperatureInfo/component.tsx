import React, { FC } from 'react';

import { FontWeight, Size, valueClassName } from './constants';

type Props = {
  value: number;
  tempSign: string;
  size: Size;
  fontWeight: FontWeight;
};

export const TemperatureInfo: FC<Props> = ({ value, tempSign, size, fontWeight }) => {
  const { fontSize, fontWeight: weight, textColor } = valueClassName[size];

  return (
    <p className={`${fontSize} ${textColor} ${weight[fontWeight]}`}>
      {value}
      <span className="ml-1">{tempSign}</span>
    </p>
  );
};
