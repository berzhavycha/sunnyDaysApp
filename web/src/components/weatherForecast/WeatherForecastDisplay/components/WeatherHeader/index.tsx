'use client';

import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSignOut } from '@/hooks';
import { useCurrentTempUnit } from '@/context';
import { Button } from '@/components/common';
import { tempUnitSigns } from '@/context/CurrentTempUnit/constants';
import { WeatherCityInput } from './components';

export const WeatherHeader = (): JSX.Element => {
  const { signOutHandler } = useSignOut();
  const { currentTempUnit, onTempUnitChange } = useCurrentTempUnit();

  const onSignOutBtnContent = <FontAwesomeIcon icon={faSignOut} className="text-white text-md" />;

  return (
    <header className="w-full flex flex-col gap-0 mb-4 sm:mb-0 sm:flex-row xl:flex-row md:max-xl:flex-col sm:gap-6 md:max-xl:gap-0 sm:justify-between xl:justify-between items-baseline">
      <WeatherCityInput />
      <div className="-mt-6 w-full sm:w-auto sm:mt-0 md:max-xl:w-full flex gap-6 sm:gap-6 md:max-xl:mb-6">
        <Button styles='text-sm w-1/2 sm:w-auto py-1 px-2 sm:text-base sm:py-2 sm:px-4 md:max-xl:w-1/2' content={tempUnitSigns[currentTempUnit.name]} onClick={onTempUnitChange} />
        <Button styles='text-sm w-1/2 sm:w-auto py-1 px-2 sm:text-base sm:py-2 sm:px-4 md:max-xl:w-1/2' content={onSignOutBtnContent} onClick={signOutHandler} />
      </div>
    </header>
  );
};
