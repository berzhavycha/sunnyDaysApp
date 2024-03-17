'use client'

import { FC } from 'react';
import Image from 'next/image';

import { WeatherForecast } from '@/hooks';
import { TemperatureInfo } from '@/components/common';
import { useCurrentTempUnit } from '@/context';
import { weatherIconMapping } from '@/components/weatherForecast/constants';
import { pickWeatherIcon } from '@/components/weatherForecast/utils';
import { tempUnitSigns } from '@/context/CurrentTempUnit/constants';
import { SubWeatherForecast } from '../SubWeatherForecast';

type Props = WeatherForecast & {
  onClick: () => void;
};

export const WeatherCard: FC<Props> = ({ onClick, city, text, daysForecast, ...info }) => {
  const { currentTempUnit } = useCurrentTempUnit();
  const weatherIcon = pickWeatherIcon(text);

  return (
    <div
      onClick={onClick}
      className="w-[32%] p-4 pb-5 bg-blue-600 rounded-3xl cursor-pointer hover:shadow-[0_0px_15px_5px_rgba(66,165,245,0.4)] transition-shadow"
    >
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col gap-2 text-left">
          <p className="text-white text-md">{city}</p>
          <TemperatureInfo
            value={info[currentTempUnit.name]}
            tempSign={tempUnitSigns[currentTempUnit.name]}
            size="medium"
            fontWeight="normal"
          />
          <p className="text-white text-sm mb-2">{text}</p>
        </div>
        <Image
          src={weatherIconMapping[weatherIcon]}
          width={120}
          height={120}
          alt={'weather-icon'}
        />
      </div>
      <div className="flex justify-between items-center gap-4">
        {daysForecast?.map((item, index) => {
          return <SubWeatherForecast key={index} {...item} />;
        })}
      </div>
    </div>
  );
};
