import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
  icon: IconProp;
  data: string | number;
  infoType: string;
};

export const ExtraWeatherInfo: React.FC<Props> = memo(({ icon, data, infoType }) => {
  return (
    <div className="text-left px-4 w-[48%] flex flex-col items-center">
      <FontAwesomeIcon className="text-blue-300 text-[20px] sm:text-[30px] mb-2" icon={icon} />
      <div className="flex flex-col text-center">
        <p className="text-white md:text-[16px] text-[10px] mb-1">{data}</p>
        <p className="text-white md:text-[12px] text-[9px]">{infoType}</p>
      </div>
    </div>
  );
});
