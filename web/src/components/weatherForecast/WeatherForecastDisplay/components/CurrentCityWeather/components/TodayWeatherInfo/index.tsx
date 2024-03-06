import Image from "next/image";
import { ExtraWeatherInfoItem } from "../ExtraWeatherInfoItem";
import { faWind, faCloudRain, faSmog } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";

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
        <div className="flex gap-8 items-start mb-2">
            <Image src={'https://cdn-icons-png.flaticon.com/512/4834/4834559.png'} width={150} height={150} alt={''} />
            <div>
                <p className='text-[60px] text-white font-bold relative mt-[10px] mb-[-10px]'>{temp.celsius} <span className='absolute top-2 right-[-20px] text-[18px]'>°C</span></p>
                <p className='text-md text-white font-light'>{text}</p>
            </div>
        </div>
        <div className="flex justify-around flex-wrap gap-3">
            <ExtraWeatherInfoItem icon={faWind} data={wind} infoType="Wind Speed" />
            <ExtraWeatherInfoItem icon={faCloudRain} data={humidity} infoType="Humidity" />
            <ExtraWeatherInfoItem icon={faSmog} data={humidity} infoType="Humidity" />
            <ExtraWeatherInfoItem icon={faWind} data={humidity} infoType="Humidity" />
        </div>
    </div>
);