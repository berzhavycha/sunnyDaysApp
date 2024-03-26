'use client';

import { FC, useRef, useState } from 'react';

import { useCurrentCityWeatherInfo } from '@/context';
import { IS_CLIENT, MD_BREAKPOINT } from '@/shared';
import { useOutsideClick, useResizeWindow } from '@/hooks';
import { ModalBackground } from '@/components/common';
import { CurrentWeatherDetails } from './components';

export const CurrentCityWeather: FC = () => {
  const { isVisible, setIsVisible } = useCurrentCityWeatherInfo();

  const [windowWidth, setWindowWidth] = useState(IS_CLIENT ? window.innerWidth : 0);
  useResizeWindow(() => setWindowWidth(IS_CLIENT ? window.innerWidth : 0));

  const onCloseCurrentCityWeather = (): void => {
    if (windowWidth <= MD_BREAKPOINT) {
      setIsVisible(false);
    }
  };

  const currentWeatherRef = useRef<HTMLDivElement>(null);
  useOutsideClick(currentWeatherRef, onCloseCurrentCityWeather);

  return (
    <>
      <ModalBackground
        isVisible={isVisible && IS_CLIENT && windowWidth < MD_BREAKPOINT}
        onClose={onCloseCurrentCityWeather}
      />
      <CurrentWeatherDetails currentWeatherRef={currentWeatherRef} />
    </>
  );
};
