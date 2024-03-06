import { FC } from "react";

type Props = {
    value: number;
    tempSign: string;
    size: 'small' | 'medium' | 'large'
}

export const valueClassName = {
    small: 'text-[20px] text-white relative',
    medium: 'text-4xl text-white relative',
    large: 'text-[60px] text-white font-bold relative'
}

export const signClassName = {
    small: 'absolute top-0 right-[-16px] text-[12px]',
    medium: 'absolute top-[-10px] right-[-8px] text-[18px]',
    large: 'absolute top-2 right-[-24px] text-[22px]'
}

export const TemperatureInfo: FC<Props> = ({ value, tempSign, size }) => {
    return (
        <p className={valueClassName[size]}>{value}<span className={signClassName[size]}>{tempSign}</span></p>
    )
}