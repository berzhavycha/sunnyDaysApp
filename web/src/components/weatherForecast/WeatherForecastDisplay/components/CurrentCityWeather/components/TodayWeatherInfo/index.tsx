'use client';

import { FC, memo } from 'react';
import Image from 'next/image';
import { faWind, faCloudRain, faDroplet } from '@fortawesome/free-solid-svg-icons';

import { useCurrentTempUnit } from '@/context';
import { TemperatureInfo, weatherIconMapping } from '@/components';
import { WeatherForecast } from '@/hooks';
import { pickWeatherIcon } from '@/components/weatherForecast/utils';
import { tempUnitSigns } from '@/context/CurrentTempUnit/constants';
import { ExtraWeatherInfo } from '../ExtraWeatherInfo';

type Props = WeatherForecast & {
  dayOfWeek: string;
};

export const TodayWeatherInfo: FC<Props> = memo(({
  city,
  text,
  windSpeed,
  dayOfWeek,
  time,
  precip,
  humidity,
  ...info
}): JSX.Element => {
  const { currentTempUnit } = useCurrentTempUnit();
  const weatherIcon = pickWeatherIcon(text);

  return (
    <div className="bg-blue-600 rounded-3xl p-5">
      <p className="text-white font-bold text-sm md:text-lg">{city}</p>
      <p className="text-white font-light text-xs sm:text-sm mb-2">
        {dayOfWeek}
        {time && `, ${time}`}
      </p>
      <div className="flex md:max-lg:flex-col justify-between pr-3 items-center mb-6">
        <Image
          src={weatherIconMapping[weatherIcon]}
          width={120}
          height={120}
          priority
          alt={'today-weather-icon'}
          className='w-16 h-16 sm:w-28 sm:h-28 md:mb-2'
        />
        <div className="text-right md:max-lg:text-center">
          <TemperatureInfo
            value={info[currentTempUnit.name]}
            tempSign={tempUnitSigns[currentTempUnit.name]}
            size="medium"
            fontWeight="bold"
          />
          <p className="md:max-lg:text-sm xl:text-lg text-sm text-white font-light">{text}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <ExtraWeatherInfo icon={faWind} data={`${windSpeed} km/h`} infoType="Wind Speed" />
        <ExtraWeatherInfo icon={faDroplet} data={humidity} infoType="Humidity" />
        <ExtraWeatherInfo icon={faCloudRain} data={`${precip} mm`} infoType="Precip" />
      </div>
    </div>
  );
});
