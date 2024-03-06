import { TemperatureInfo } from "@/components";
import { weatherIconMapping } from "@/components/weatherForecast/constants";
import { pickWeatherIcon } from "@/components/weatherForecast/WeatherForecastDisplay/utils";
import Image from "next/image";
import { FC } from "react";

export type ForecastItemProps = {
    text: string,
    celsius: number,
    fahrenheit: number,
    day: string
}

export const ForecastItem: FC<ForecastItemProps> = ({ text, day, ...temp }) => {
    const weatherIcon = pickWeatherIcon(text);

    return (
        <div className="flex justify-between items-center rounded-xl transition hover:bg-blue-700 p-4 cursor-pointer">
            <Image src={weatherIconMapping[weatherIcon]} width={45} height={45} alt={'weather-icon'} />
            <TemperatureInfo value={temp.celsius} tempSign="°C" size="small"/>
            <p className='text-white font-light w-1/3 text-left'>{day}</p>
        </div>
    )
};