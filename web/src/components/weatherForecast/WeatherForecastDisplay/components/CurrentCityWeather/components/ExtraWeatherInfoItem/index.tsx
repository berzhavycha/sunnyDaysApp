import React from 'react';

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
    icon: IconDefinition,
    data: string,
    infoType: string
};

export const ExtraWeatherInfoItem: React.FC<Props> = ({ icon, data, infoType }) => {
    return (
        <div className="text-left px-4 w-[48%] flex justify-start items-center gap-2">
            <FontAwesomeIcon className="text-blue-300 text-[28px] mb-2" icon={icon} />
            <div className="flex flex-col text-left">
                <p className='text-white text-[14px]'>{data}</p>
                <p className='text-white text-[12px]'>{infoType}</p>
            </div>
        </div>
    );
};
