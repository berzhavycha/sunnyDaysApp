import { FC } from 'react';
import Image from 'next/image';

type Props = {
  text?: string;
};

export const NoData: FC<Props> = ({ text }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Image
        src={require('@/assets/images/not-found.png')}
        width={200}
        height={200}
        priority
        alt={'not-found'}
      />
      <p className="text-white mt-2 text-xl">{text ?? 'No available information'}</p>
    </div>
  );
};
