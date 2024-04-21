import { CurrentCityWeatherInfoState } from '@/context';
import { daysOfWeek, getTimeFormat } from '@/shared';

type HookReturn = {
  dayOfWeek: string;
  time: string;
};

export const useCurrentWeatherTime = (
  currentCityWeatherInfo: CurrentCityWeatherInfoState | undefined,
): HookReturn => {
  let dayOfWeek: string = ''
  let time: string = ''

  if (currentCityWeatherInfo?.info?.dayOfWeek) {
    dayOfWeek = currentCityWeatherInfo.info.dayOfWeek
    time = ''
  } else {
    const dateInstance = new Date(currentCityWeatherInfo?.info?.time ?? '');
    dayOfWeek = daysOfWeek[dateInstance.getDay()];
    time = `${getTimeFormat(dateInstance.getHours())}:${getTimeFormat(dateInstance.getMinutes())}`
  }

  return { dayOfWeek, time };
};
