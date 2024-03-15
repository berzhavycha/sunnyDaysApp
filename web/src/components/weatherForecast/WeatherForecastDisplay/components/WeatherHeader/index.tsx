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
    <header className="w-full flex justify-between items-baseline">
      <WeatherCityInput />
      <div className="flex gap-6">
        <Button content={tempUnitSigns[currentTempUnit.name]} onClick={onTempUnitChange} />
        <Button content={onSignOutBtnContent} onClick={signOutHandler} />
      </div>
    </header>
  );
};
