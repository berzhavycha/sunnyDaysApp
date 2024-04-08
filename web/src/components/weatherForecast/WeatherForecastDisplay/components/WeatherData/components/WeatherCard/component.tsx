'use client'

import React, { FC, PropsWithChildren, ReactElement, isValidElement, memo } from 'react';

import { useCurrentCityWeatherInfo, useCurrentTempUnit } from '@/context';
import { WeatherForecast } from '@/hooks';
import { IS_CLIENT, MD_BREAKPOINT } from '@/shared';

type Props = WeatherForecast & PropsWithChildren & {
  onClick?: () => void;
};

export const WeatherCard: FC<Props> = memo(
  ({ city, text, daysForecast, children, ...info }) => {
    const { currentTempUnit } = useCurrentTempUnit();
    const { setShownWeatherInfo, setCurrentCityWeatherInfo, setIsVisibleBelowMedium } = useCurrentCityWeatherInfo()

    const onClick = (): void => {
      const props = {
        city,
        text,
        daysForecast,
        ...info
      }

      setShownWeatherInfo(props);
      setCurrentCityWeatherInfo({ info: props });

      if (IS_CLIENT && window.innerWidth < MD_BREAKPOINT) {
        setIsVisibleBelowMedium(true);
      }
    };

    return (
      <div
        onClick={onClick}
        className="w-full min-h-72 flex flex-col justify-between p-4 pb-5 bg-blue-600 rounded-3xl cursor-pointer hover:shadow-[0_0px_15px_5px_rgba(66,165,245,0.4)] transition-shadow sm:max-md:min-h-60 sm:w-[48%] md:w-full lg:w-[48%] 2xl:w-[32%]"
      >
        {React.Children.map(children, child => {
          if (isValidElement(child)) {
            return React.cloneElement(child as ReactElement, { unit: currentTempUnit.name });
          }
          return child;
        })}
      </div>
    );
  },
);
