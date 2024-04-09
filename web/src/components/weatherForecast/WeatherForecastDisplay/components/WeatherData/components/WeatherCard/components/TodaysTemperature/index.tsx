'use client'

import { TemperatureInfo } from "@/components/common";
import { useCurrentTempUnit, tempUnitSigns } from "@/context";
import { FC } from "react";

type Props = {
    celsius: number;
    fahrenheit: number;
}

export const TodaysTemperature: FC<Props> = ({ ...info }) => {
    const { currentTempUnit } = useCurrentTempUnit();

    return (
        <TemperatureInfo
            value={info[currentTempUnit.name]}
            tempSign={tempUnitSigns[currentTempUnit.name]}
            size="medium"
            fontWeight="normal"
        />
    )
}