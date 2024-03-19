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
    <header className="w-full flex flex-row md:max-xl:flex-col gap-2 sm:gap-6 md:max-xl:gap-0 justify-between items-baseline">
      <WeatherCityInput />
      <div className="md:max-xl:w-full flex gap-2 sm:gap-6 md:max-xl:mb-6">
        <Button styles='text-xs py-1 px-2 sm:text-base sm:py-2 sm:px-4 md:max-xl:w-1/2' content={tempUnitSigns[currentTempUnit.name]} onClick={onTempUnitChange} />
        <Button styles='text-xs py-1 px-2 sm:text-base sm:py-2 sm:px-4 md:max-xl:w-1/2' content={onSignOutBtnContent} onClick={signOutHandler} />
      </div>
    </header>
  );
};
