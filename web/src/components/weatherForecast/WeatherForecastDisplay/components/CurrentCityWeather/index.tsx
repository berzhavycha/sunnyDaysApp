'use client';

import { FC, useState } from 'react';

import { ModalBackground } from '@/components/common';
import { useCurrentCityWeatherInfo } from '@/context';
import { useResizeWindow } from '@/hooks';
import { IS_CLIENT, MD_BREAKPOINT } from '@/shared';

import { CurrentWeatherDetails, DeletionModal } from './components';

export const CurrentCityWeather: FC = () => {
  const { isVisibleBelowMedium, setIsVisibleBelowMedium, isDeletionInProgress } =
    useCurrentCityWeatherInfo();
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState<boolean>(false);
  const [cityToDelete, setCityToDelete] = useState<string>('');

  const [windowWidth, setWindowWidth] = useState(IS_CLIENT ? window.innerWidth : 0);
  useResizeWindow(() => setWindowWidth(IS_CLIENT ? window.innerWidth : 0));

  const onCloseWeatherModal = (): void => {
    if (windowWidth <= MD_BREAKPOINT) {
      setIsVisibleBelowMedium(false);
    }
  };

  const onCloseDeletionModal = (): void => {
    if (!isDeletionInProgress) {
      setIsDeletionModalOpen(false);
    }
  };

  const onDelete = (city: string): void => {
    setIsDeletionModalOpen(true);
    setCityToDelete(city);
  };

  return (
    <>
      <ModalBackground isVisible={isVisibleBelowMedium} onClose={onCloseWeatherModal}>
        <CurrentWeatherDetails onDelete={onDelete} />
        <ModalBackground
          isVisible={isDeletionModalOpen || isDeletionInProgress}
          onClose={onCloseDeletionModal}
          zIndex={30}
        >
          <DeletionModal
            isVisible={isDeletionModalOpen}
            city={cityToDelete}
            onClose={onCloseDeletionModal}
          />
        </ModalBackground>
      </ModalBackground>
    </>
  );
};
