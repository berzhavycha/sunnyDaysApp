import { MoonLoader } from 'react-spinners';

export const Spinner = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <MoonLoader color="#3b82f6" size={100} />
    </div>
  );
};
