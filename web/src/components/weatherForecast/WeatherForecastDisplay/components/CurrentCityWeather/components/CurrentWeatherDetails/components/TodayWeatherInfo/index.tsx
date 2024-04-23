import { faCloudRain, faDroplet, faWind } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { FC, memo } from 'react';

import { TemperatureInfo } from '@/components';
import { weatherIconMapping } from '@/components/weatherForecast';
import { pickWeatherIcon } from '@/components/weatherForecast/utils';
import { useCurrentTempUnit } from '@/context';
import { tempUnitSigns } from '@/context/CurrentTempUnit/constants';
import { WeatherForecast } from '@/shared';

import { ExtraWeatherInfo } from '../ExtraWeatherInfo';

type Props = WeatherForecast & {
  dayOfWeek: string;
};

export const TodayWeatherInfo: FC<Props> = memo(
  ({ city, text, windSpeed, dayOfWeek, time, precip, humidity, ...info }) => {
    const { currentTempUnit } = useCurrentTempUnit();
    const weatherIcon = pickWeatherIcon(text);

    return (
      <div className="bg-blue-600 rounded-3xl p-5">
        <p className="text-white font-bold text-sm md:text-md lg:text-lg">{city}</p>
        <p className="text-white font-light text-xs h-7 lg:text-sm">
          {dayOfWeek}
          {time && `, ${time}`}
        </p>
        <div className="flex justify-between pr-3 items-center mb-6 md:max-lg:flex-col">
          <Image
            src={weatherIconMapping[weatherIcon]}
            width={120}
            height={120}
            priority
            alt={'today-weather-icon'}
            className="w-16 h-16 sm:w-28 sm:h-28 md:mb-2"
          />
          <div className="text-right md:max-lg:text-center">
            <TemperatureInfo
              value={info[currentTempUnit.name]}
              tempSign={tempUnitSigns[currentTempUnit.name]}
              size="large"
              fontWeight="bold"
            />
            <p className="text-sm text-white font-light md:max-lg:text-sm xl:text-lg">{text}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <ExtraWeatherInfo icon={faWind} data={`${windSpeed} km/h`} infoType="Wind Speed" />
          <ExtraWeatherInfo icon={faDroplet} data={humidity} infoType="Humidity" />
          <ExtraWeatherInfo icon={faCloudRain} data={`${precip} mm`} infoType="Precip" />
        </div>
      </div>
    );
  },
);
