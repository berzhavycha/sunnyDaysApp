import Image from 'next/image';
import React, { FC, memo } from 'react';

import { weatherIconMapping } from '@/components/weatherForecast/constants';
import { pickWeatherIcon } from '@/components/weatherForecast/utils';
import { ClientTemperatureInfo } from '../ClientTemperatureInfo';

type Props = {
  celsius: number;
  fahrenheit: number;
  text: string;
  dayOfWeek: string;
  className: string;
};

export const SubWeatherForecast: FC<Props> = memo(({ text, dayOfWeek, className, ...info }) => {
  const weatherIcon = pickWeatherIcon(text);

  return (
    <div className={`${className} text-center relative`}>
      <div className="w-full mb-2 flex flex-col items-center justify-between bg-gradient-to-t from-blue-800 to-blue-600 rounded-xl p-2 text-center">
        <Image
          src={weatherIconMapping[weatherIcon]}
          width={65}
          height={65}
          alt={'subweather-icon'}
          className="w-14 h-14 absolute top-[-24px] left-1/5 sm:w-12 sm:h-12 md:w-18 md:h-18"
        />
        <div className="mt-8 pb-1 sm:mt-6">
          <ClientTemperatureInfo
            size="small"
            fontWeight="normal"
            {...info}
          />
        </div>
      </div>
      <p className="text-white text-[12px]">{dayOfWeek}</p>
    </div>
  );
});
