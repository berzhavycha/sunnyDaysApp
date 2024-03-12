import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
  icon: IconProp;
  data: string | number;
  infoType: string;
};

export const ExtraWeatherInfo: React.FC<Props> = ({ icon, data, infoType }) => {
  return (
    <div className="text-left px-4 w-[48%] flex flex-col items-center">
      <FontAwesomeIcon className="text-blue-300 text-[28px] mb-2" icon={icon} />
      <div className="flex flex-col text-center">
        <p className="text-white text-[14px] mb-1">{data}</p>
        <p className="text-white text-[11px]">{infoType}</p>
      </div>
    </div>
  );
};
