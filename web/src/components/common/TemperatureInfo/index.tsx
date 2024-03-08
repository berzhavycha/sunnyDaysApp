import { FC } from 'react';
import { valueClassName } from './constants';

type Props = {
  value: number;
  tempSign: string;
  size: 'small' | 'medium' | 'large';
  fontWeight: 'normal' | 'light' | 'bold';
};

export const TemperatureInfo: FC<Props> = ({ value, tempSign, size, fontWeight }) => {
  const { fontSize: valueFontSize, fontWeight: weight, textColor } = valueClassName[size];

  const className = `text-${valueFontSize} ${textColor} ${weight[fontWeight]}`;

  return (
    <p className={className}>
      {value}
      <span className="ml-1">{tempSign}</span>
    </p>
  );
};
