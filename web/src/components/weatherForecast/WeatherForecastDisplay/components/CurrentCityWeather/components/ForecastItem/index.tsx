import { FC } from 'react';
import Image from 'next/image';

import { TemperatureInfo } from '@/components';
import { useCurrentTempUnit } from '@/context';
import { WeatherForecastDays } from '@/hooks';
import { upperCaseFirstLetter } from '@/utils';
import { weatherIconMapping } from '@/components/weatherForecast/constants';
import { pickWeatherIcon } from '@/components/weatherForecast/utils';
import { tempUnitSigns } from '@/context/CurrentTempUnit/constants';

type Props = WeatherForecastDays & {
  onClick: () => void;
};

export const ForecastItem: FC<Props> = ({ onClick, text, dayOfWeek, ...info }) => {
  const { currentTempUnit } = useCurrentTempUnit();
  const weatherIcon = pickWeatherIcon(text);

  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center rounded-xl transition hover:bg-blue-700 p-4 cursor-pointer"
    >
      <Image src={weatherIconMapping[weatherIcon]} width={45} height={45} alt={'weather-icon'} />
      <div className="flex items-center">
        <TemperatureInfo
          value={info[`max${upperCaseFirstLetter(currentTempUnit.name)}` as keyof typeof info]}
          tempSign={tempUnitSigns[currentTempUnit.name]}
          size="small"
          fontWeight="bold"
        />
        <span className="text-white mx-1">/</span>
        <TemperatureInfo
          value={info[`min${upperCaseFirstLetter(currentTempUnit.name)}` as keyof typeof info]}
          tempSign={tempUnitSigns[currentTempUnit.name]}
          size="small"
          fontWeight="light"
        />
      </div>
      <p className="text-white font-light w-1/3 text-left">{dayOfWeek}</p>
    </div>
  );
};
