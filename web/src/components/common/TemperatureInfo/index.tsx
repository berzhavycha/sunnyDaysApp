import { FC } from "react";
import { valueClassName, signClassName } from "./constants";

type Props = {
    value: number;
    tempSign: string;
    size: 'small' | 'medium' | 'large';
    fontWeight: 'normal' | 'light' | 'bold';
}

export const TemperatureInfo: FC<Props> = ({ value, tempSign, size, fontWeight }) => {
    const { fontSize: valueFontSize, fontWeight: weight, textColor, position } = valueClassName[size];
    const { fontSize: signFontSize, position: signPosition, top, right } = signClassName[size];

    return (
        <p className={`text-${valueFontSize} ${textColor} ${weight[fontWeight]} ${position}`}>
            {value}
            <span className={`text-${signFontSize} ${signPosition} ${top ? `top-${top}` : ''} ${right ? `right-${right}` : ''}`}>
                {tempSign}
            </span>
        </p>
    );
};