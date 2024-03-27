'use client';

import { FC, useState } from 'react';

import { useCurrentCityWeatherInfo } from '@/context';
import { IS_CLIENT, MD_BREAKPOINT } from '@/shared';
import { useResizeWindow } from '@/hooks';
import { ModalBackground } from '@/components/common';
import { CurrentWeatherDetails, DeletionModal } from './components';

export const CurrentCityWeather: FC = () => {
  const { isVisible, setIsVisible } = useCurrentCityWeatherInfo();
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [cityToDelete, setCityToDelete] = useState<string>('')

  const [windowWidth, setWindowWidth] = useState(IS_CLIENT ? window.innerWidth : 0);
  useResizeWindow(() => setWindowWidth(IS_CLIENT ? window.innerWidth : 0));

  const onCloseModalBackground = (): void => {
    if (windowWidth <= MD_BREAKPOINT) {
      setIsVisible(false);
    }
  };

  const onDelete = (city: string): void => {
    setIsDeleting(true)
    setCityToDelete(city)
  }

  const onDeletionModalClose = (): void => setIsDeleting(false)

  return (
    <>
      <ModalBackground
        isVisible={isVisible && IS_CLIENT && windowWidth < MD_BREAKPOINT}
        onClose={onCloseModalBackground}
      >
        <CurrentWeatherDetails onDelete={onDelete} />
        <ModalBackground
          isVisible={isDeleting}
          onClose={onDeletionModalClose}
          zIndex={30}
        >
          <DeletionModal isVisible={isDeleting} city={cityToDelete} onClose={onDeletionModalClose} />
        </ModalBackground>
      </ModalBackground>
    </>
  );
};
