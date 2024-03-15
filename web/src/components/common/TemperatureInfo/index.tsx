import { FC } from 'react';

import { valueClassName } from './constants';

type Props = {
  value: number;
  tempSign: string;
  size: 'small' | 'medium' | 'large';
  fontWeight: 'normal' | 'light' | 'bold';
};

export const TemperatureInfo: FC<Props> = ({ value, tempSign, size, fontWeight }) => {
  const { fontSize, fontWeight: weight, textColor } = valueClassName[size];

  return (
    <p className={`text-${fontSize} ${textColor} ${weight[fontWeight]}`}>
      {value}
      <span className="ml-1">{tempSign}</span>
    </p>
  );
};
