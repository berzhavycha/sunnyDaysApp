'use client';

import { FC, memo } from 'react';
import Image from 'next/image';

import { TemperatureInfo } from '@/components';
import { useCurrentCityWeatherInfo, useCurrentTempUnit } from '@/context';
import { WeatherForecastDays } from '@/hooks';
import { upperCaseFirstLetter } from '@/shared';
import { weatherIconMapping } from '@/components/weatherForecast/constants';
import { pickWeatherIcon } from '@/components/weatherForecast/utils';
import { tempUnitSigns } from '@/context/CurrentTempUnit/constants';

type Props = WeatherForecastDays & {
  onClick: () => void;
};

export const ForecastItem: FC<Props> = memo(({ onClick, text, dayOfWeek, ...info }) => {
  const { currentTempUnit } = useCurrentTempUnit();
  const { currentForecastDay } = useCurrentCityWeatherInfo();

  const weatherIcon = pickWeatherIcon(text);

  const minTemp = info[`min${upperCaseFirstLetter(currentTempUnit.name)}` as keyof typeof info];
  const maxTemp = info[`max${upperCaseFirstLetter(currentTempUnit.name)}` as keyof typeof info];

  return (
    <div
      onClick={onClick}
      className={`${currentForecastDay === dayOfWeek && 'bg-blue-700'} flex justify-between items-center rounded-xl p-4 cursor-pointer transition hover:bg-blue-700 md:px-2`}
    >
      <Image
        src={weatherIconMapping[weatherIcon]}
        width={45}
        height={45}
        alt={'weather-icon'}
        className="w-8 h-8 md:w-12 md:h-12"
      />
      <div className="flex items-center">
        <TemperatureInfo
          value={maxTemp}
          tempSign={tempUnitSigns[currentTempUnit.name]}
          size="small"
          fontWeight="bold"
        />
        <span className="text-white mx-1">/</span>
        <TemperatureInfo
          value={minTemp}
          tempSign={tempUnitSigns[currentTempUnit.name]}
          size="small"
          fontWeight="light"
        />
      </div>
      <p className="text-white font-light w-1/3 text-left text-xs md:text-sm lg:text-base">
        {dayOfWeek}
      </p>
    </div>
  );
});
