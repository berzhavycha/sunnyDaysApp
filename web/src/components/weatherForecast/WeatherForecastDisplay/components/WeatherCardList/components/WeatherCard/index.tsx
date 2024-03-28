import { FC, memo } from 'react';
import Image from 'next/image';

import { WeatherForecast } from '@/hooks';
import { Spinner, TemperatureInfo } from '@/components/common';
import { useCurrentTempUnit } from '@/context';
import { weatherIconMapping } from '@/components/weatherForecast/constants';
import { pickWeatherIcon } from '@/components/weatherForecast/utils';
import { tempUnitSigns } from '@/context/CurrentTempUnit/constants';
import { SubWeatherForecast } from '../SubWeatherForecast';

type Props = WeatherForecast & {
  onClick: () => void;
};

export const WeatherCard: FC<Props> = memo(
  ({ onClick, city, text, _loading, daysForecast, ...info }) => {
    const { currentTempUnit } = useCurrentTempUnit();
    const weatherIcon = pickWeatherIcon(text);

    return (
      <div
        onClick={onClick}
        className="w-full min-h-72 flex flex-col justify-between p-4 pb-5 bg-blue-600 rounded-3xl cursor-pointer hover:shadow-[0_0px_15px_5px_rgba(66,165,245,0.4)] transition-shadow sm:max-md:min-h-60 sm:w-[48%] md:w-full lg:w-[48%] 2xl:w-[32%]"
      >
        {_loading ? (
          <Spinner />
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <div className="flex flex-col gap-2 text-left">
                <p className="text-sm text-white sm:text-sm md:text-md">{city}</p>
                <TemperatureInfo
                  value={info[currentTempUnit.name]}
                  tempSign={tempUnitSigns[currentTempUnit.name]}
                  size="medium"
                  fontWeight="normal"
                />
                <p className="text-xs text-white mb-2 sm:text-xs">{text}</p>
              </div>
              <Image
                src={weatherIconMapping[weatherIcon]}
                width={120}
                height={120}
                alt={'weather-icon'}
                className="mb-4 sm:w-20 sm:h-20 lg:w-28 lg:h-28"
              />
            </div>
            <div className="flex justify-between items-center gap-4">
              {daysForecast?.map((item, index) => {
                return <SubWeatherForecast key={index} {...item} />;
              })}
            </div>
          </>
        )}
      </div>
    );
  },
);
