import { FC } from 'react';
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

export const TodayWeatherInfo: FC<Props> = ({
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
      <p className="text-white font-bold text-lg">{city}</p>
      <p className="text-white font-light text-sm mb-2">
        {dayOfWeek}
        {time && `, ${time}`}
      </p>
      <div className="flex justify-between pr-3 items-center mb-6">
        <Image
          src={weatherIconMapping[weatherIcon]}
          width={120}
          height={120}
          alt={'today-weather-icon'}
        />
        <div className='text-right'>
          <TemperatureInfo
            value={info[currentTempUnit.name]}
            tempSign={tempUnitSigns[currentTempUnit.name]}
            size="medium"
            fontWeight="bold"
          />
          <p className="text-lg text-white font-light">{text}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <ExtraWeatherInfo icon={faWind} data={`${windSpeed} km/h`} infoType="Wind Speed" />
        <ExtraWeatherInfo icon={faDroplet} data={humidity} infoType="Humidity" />
        <ExtraWeatherInfo icon={faCloudRain} data={`${precip} mm`} infoType="Precip" />
      </div>
    </div>
  );
};
