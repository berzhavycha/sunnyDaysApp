'use client';

import { FC } from 'react';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSignOut } from '@/hooks';
import { useCurrentTempUnit } from '@/context';
import { Button } from '@/components/common';
import { tempUnitSigns } from '@/context/CurrentTempUnit/constants';
import { WeatherCityInput } from './components';

export const WeatherHeader: FC = () => {
  const { signOutHandler } = useSignOut();
  const { currentTempUnit, onTempUnitChange } = useCurrentTempUnit();

  const onSignOutBtnContent = <FontAwesomeIcon icon={faSignOut} className="text-white text-md" />;

  const utilButtonStyles =
    'text-sm w-1/2 py-1 px-2 sm:text-base sm:w-auto sm:py-2 sm:px-4 md:max-xl:w-1/2';

  return (
    <header className="w-full flex flex-col gap-0 mb-4 items-baseline sm:mb-0 sm:flex-row sm:gap-6 sm:justify-between md:max-xl:flex-col md:max-xl:gap-0 xl:justify-between xl:flex-row">
      <WeatherCityInput />
      <div className="-mt-2 w-full flex gap-6 sm:w-auto sm:mt-0 sm:gap-6 md:max-xl:w-full md:max-xl:mb-6">
        <Button
          className={utilButtonStyles}
          content={tempUnitSigns[currentTempUnit.name]}
          onClick={onTempUnitChange}
        />
        <Button className={utilButtonStyles} content={onSignOutBtnContent} onClick={signOutHandler} />
      </div>
    </header>
  );
};
