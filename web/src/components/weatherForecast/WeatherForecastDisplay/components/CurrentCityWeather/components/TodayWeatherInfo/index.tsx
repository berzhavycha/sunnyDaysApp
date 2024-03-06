import { FC } from "react";

import Image from "next/image";
import { ExtraWeatherInfoItem } from "../ExtraWeatherInfoItem";
import { faWind, faCloudRain, faSmog } from "@fortawesome/free-solid-svg-icons";
import { TemperatureInfo } from "@/components";

type Props = {
    city: string,
    celsius: number,
    fahrenheit: number,
    text: string,
    wind: string,
    humidity: string,
    smog: string
}

export const TodayWeatherInfo: FC<Props> = ({ city, text, wind, humidity, ...temp }): JSX.Element => (
    <div className="bg-blue-600 rounded-3xl p-5">
        <p className='text-white font-bold text-lg'>{city}</p>
        <p className='text-white font-light text-sm'>Tuesday, 12:35</p>
        <div className="flex justify-between pr-8 items-start mb-2">
            <Image src={'https://cdn-icons-png.flaticon.com/512/4834/4834559.png'} width={150} height={150} alt={''} />
            <div>
                <TemperatureInfo value={temp.celsius} tempSign="°C" size="large"/>
                <p className='text-md text-white font-light'>{text}</p>
            </div>
        </div>
        <div className="flex justify-between flex-wrap gap-3">
            <ExtraWeatherInfoItem icon={faWind} data={wind} infoType="Wind Speed" />
            <ExtraWeatherInfoItem icon={faCloudRain} data={humidity} infoType="Humidity" />
            <ExtraWeatherInfoItem icon={faSmog} data={humidity} infoType="Humidity" />
            <ExtraWeatherInfoItem icon={faWind} data={humidity} infoType="Something" />
        </div>
    </div>
);