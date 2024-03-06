import { FC } from "react";
import { ForecastItem, ForecastItemProps } from "../ForecastItem";

type Props = {
    info: ForecastItemProps[]
}

export const Forecast: FC<Props> = ({ info }) => (
    <div className="bg-blue-600 rounded-3xl pt-4 py-2 px-3 h-full">
        <p className='text-white font-bold text-lg mb-2 pl-3'>Forecast</p>
        <div className="flex flex-col justify-between">
            {info.map((dayForecast, index) => (
                <ForecastItem
                    key={index}
                    {...dayForecast}
                />
            ))}
        </div>
    </div>
);