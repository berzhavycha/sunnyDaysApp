'use client'

import React, { FC } from 'react';
import Image from 'next/image';

import { TemperatureInfo, weatherIconMapping } from '@/components';
import { useCurrentTempUnit } from '@/context';
import { pickWeatherIcon } from '@/components/weatherForecast/utils';
import { tempUnitSigns } from '@/context/CurrentTempUnit/constants';

type Props = {
  celsius: number;
  fahrenheit: number;
  text: string;
  dayOfWeek: string;
};

export const SubWeatherForecast: FC<Props> = ({ text, dayOfWeek, ...info }) => {
  const { currentTempUnit } = useCurrentTempUnit();
  const weatherIcon = pickWeatherIcon(text);

  return (
    <div className="w-1/3 text-center">
      <div className="w-full mb-2 flex flex-col items-center justify-between bg-gradient-to-t from-blue-800 to-blue-600 rounded-xl p-2 text-center relative">
        <Image
          src={weatherIconMapping[weatherIcon]}
          width={65}
          height={65}
          alt={'subweather-icon'}
          className="absolute top-[-24px] left-1/5"
        />
        <div className="mt-11 pb-1">
          <TemperatureInfo
            value={info[currentTempUnit.name]}
            tempSign={tempUnitSigns[currentTempUnit.name]}
            size="small"
            fontWeight="normal"
          />
        </div>
      </div>
      <p className="text-white text-[12px]">{dayOfWeek}</p>
    </div>
  );
};
