import { useState, useEffect } from 'react';

import { CurrentCityWeatherInfoState } from '@/context';
import { daysOfWeek, getTimeFormat } from '@/shared';

type HookReturn = {
  dayOfWeek: string;
  time: string;
};

export const useCurrentWeatherTime = (
  currentCityWeatherInfo: CurrentCityWeatherInfoState | undefined,
): HookReturn => {
  const [dayOfWeek, setDayOfWeek] = useState<string>('');
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    if (currentCityWeatherInfo?.info?.dayOfWeek) {
      setDayOfWeek(currentCityWeatherInfo?.info.dayOfWeek);
      setTime('');
    } else {
      const dateInstance = new Date(currentCityWeatherInfo?.info?.time ?? '');
      const dayOfWeek = daysOfWeek[dateInstance.getDay()];
      setDayOfWeek(dayOfWeek);
      setTime(
        `${getTimeFormat(dateInstance.getHours())}:${getTimeFormat(dateInstance.getMinutes())}`,
      );
    }
  }, [currentCityWeatherInfo]);

  return { dayOfWeek, time };
};
