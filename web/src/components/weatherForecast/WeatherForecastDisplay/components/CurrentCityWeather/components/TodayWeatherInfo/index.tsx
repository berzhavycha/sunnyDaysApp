import { FC } from "react";

import Image from "next/image";
import { ExtraWeatherInfoItem } from "../ExtraWeatherInfoItem";
import { faWind, faCloudRain, faDroplet } from "@fortawesome/free-solid-svg-icons";
import { TemperatureInfo, weatherIconMapping } from "@/components";
import { WeatherForecast } from "@/hooks";
import { pickWeatherIcon } from "@/components/weatherForecast/WeatherForecastDisplay/utils";
import { useCurrentTempUnit } from "@/context";
import { tempUnitSigns } from "@/context/CurrentTempUnit/constants";

type Props = WeatherForecast & {
    dayOfWeek: string
}

export const TodayWeatherInfo: FC<Props> = ({ city, text, windSpeed, dayOfWeek, time, precip, humidity, ...info }): JSX.Element => {
    const { currentTempUnit } = useCurrentTempUnit();
    const weatherIcon = pickWeatherIcon(text);

    return (
        <div className="bg-blue-600 rounded-3xl p-5">
            <p className='text-white font-bold text-lg'>{city}</p>
            <p className='text-white font-light text-sm mb-2'>{dayOfWeek}{`, ${time}`}</p>
            <div className="flex justify-between pr-8 items-start mb-6">
                <Image src={weatherIconMapping[weatherIcon]} width={130} height={130} alt={'today-weather-icon'} />
                <div>
                    <TemperatureInfo value={info[currentTempUnit.name]} tempSign={tempUnitSigns[currentTempUnit.name]} size="large" fontWeight="bold" />
                    <p className='text-md text-white font-light'>{text}</p>
                </div>
            </div>
            <div className="flex justify-between">
                <ExtraWeatherInfoItem icon={faWind} data={`${windSpeed} km/h`} infoType="Wind Speed" />
                <ExtraWeatherInfoItem icon={faDroplet} data={humidity} infoType="Humidity" />
                <ExtraWeatherInfoItem icon={faCloudRain} data={`${precip} mm`} infoType="Precip" />
            </div>
        </div>
    );
}