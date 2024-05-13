'use client';

import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

import { Button } from '@/components/common';
import { tempUnitSigns, useCurrentTempUnit } from '@/context';
import { signOut } from '@/services';

export const ControlButtons: FC = () => {
  const { currentTempUnit, onTempUnitChange } = useCurrentTempUnit();

  const signOutHandler = async (): Promise<void> => await signOut();

  const onSignOutBtnContent = <FontAwesomeIcon icon={faSignOut} className="text-white text-md" />;

  const utilButtonStyles =
    'text-sm w-1/2 py-1 px-2 sm:text-base sm:w-auto sm:py-2 sm:px-4 md:max-xl:w-1/2';

  return (
    <div className="-mt-2 w-full flex gap-6 sm:w-auto sm:mt-0 sm:gap-6 md:max-xl:w-full md:max-xl:mb-6">
      <Button
        className={utilButtonStyles}
        content={tempUnitSigns[currentTempUnit.name]}
        onClick={onTempUnitChange}
      />
      <Button className={utilButtonStyles} content={onSignOutBtnContent} onClick={signOutHandler} />
    </div>
  );
};
