import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, memo } from 'react';

type Props = {
  icon: IconProp;
  data: string | number;
  infoType: string;
};

export const ExtraWeatherInfo: FC<Props> = memo(({ icon, data, infoType }) => {
  return (
    <div className="text-left px-4 w-[48%] flex flex-col items-center">
      <FontAwesomeIcon className="text-blue-300 mb-2 text-[20px] sm:text-[30px]" icon={icon} />
      <div className="flex flex-col text-center">
        <p className="text-white text-[10px] mb-1 sm:text-[12px] lg:text-[16px]">{data}</p>
        <p className="text-white text-[9px] sm:text-[10px] lg:text-[11px]">{infoType}</p>
      </div>
    </div>
  );
});
