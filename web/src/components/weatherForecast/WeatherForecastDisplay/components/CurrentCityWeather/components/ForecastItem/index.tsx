import { TemperatureInfo } from "@/components";
import { weatherIconMapping } from "@/components/weatherForecast/constants";
import { pickWeatherIcon } from "@/components/weatherForecast/WeatherForecastDisplay/utils";
import { useCurrentTempUnit } from "@/context";
import { tempUnitSigns } from "@/context/CurrentTempUnit/constants";
import { WeatherForecastDays } from "@/hooks";
import { upperCaseFirstLetter } from "@/utils";
import Image from "next/image";
import { FC } from "react";

export const ForecastItem: FC<WeatherForecastDays> = ({ text, dayOfWeek, ...info }) => {
    const { currentTempUnit } = useCurrentTempUnit();
    const weatherIcon = pickWeatherIcon(text);

    return (
        <div className="flex justify-between items-center rounded-xl transition hover:bg-blue-700 p-4 cursor-pointer">
            <Image src={weatherIconMapping[weatherIcon]} width={45} height={45} alt={'weather-icon'} />
            <div className="flex items-center">
                <TemperatureInfo value={info[`max${upperCaseFirstLetter(currentTempUnit.name)}` as keyof typeof info]} tempSign={tempUnitSigns[currentTempUnit.name]} size="small" fontWeight="bold" />
                <span className="text-white ml-5 mr-1">/</span>
                <TemperatureInfo value={info[`min${upperCaseFirstLetter(currentTempUnit.name)}` as keyof typeof info]} tempSign={tempUnitSigns[currentTempUnit.name]} size="small" fontWeight="light" />
            </div>
            <p className='text-white font-light w-1/3 text-left'>{dayOfWeek}</p>
        </div>
    )
};
