import { weatherIconMapping } from "@/components/weatherForecast/constants";
import { pickWeatherIcon } from "@/components/weatherForecast/weatherForecastDisplay/utils";
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
        <div className="flex justify-between items-center rounded-xl transition hover:bg-blue-700 p-2 cursor-pointer">
            <Image src={weatherIconMapping[weatherIcon]} width={40} height={40} alt={'weather-icon'} />
            <p className='text-[20px] text-white font-light relative'>{temp.celsius} <span className='absolute top-0 right-[-20px] text-[13px]'>°C</span></p>
            <p className='text-white font-light w-1/3 text-left'>{day}</p>
        </div>
    )
};