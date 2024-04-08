import Image from 'next/image';
import { FC, memo } from 'react';

import { tempUnitSigns, TempUnits } from '@/context';
import { WeatherForecast } from '@/hooks';
import { TemperatureInfo } from '@/components/common';
import { weatherIconMapping } from '@/components/weatherForecast/constants';
import { pickWeatherIcon } from '@/components/weatherForecast/utils';

import { ForecastSlider } from '../../../ForecastSlider';

type Props = WeatherForecast & {
    unit: TempUnits
};

export const WeatherCardInfo: FC<Props> = memo(
    ({ city, text, daysForecast, unit, ...info }) => {
        const weatherIcon = pickWeatherIcon(text);

        return (
            <>
                <div className="flex justify-between items-center mb-2">
                    <div className="flex flex-col gap-2 text-left">
                        <p className="text-sm text-white sm:text-sm md:text-md">{city}</p>
                        <TemperatureInfo
                            value={info[unit]}
                            tempSign={tempUnitSigns[unit]}
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
                    <ForecastSlider forecasts={daysForecast} />
                </div>
            </>
        );
    },
);
