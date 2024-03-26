import { FC } from 'react';
import { MoonLoader } from 'react-spinners';

export const Spinner: FC = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <MoonLoader color="#3b82f6" size={100} />
    </div>
  );
};
