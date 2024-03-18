import { Spinner } from '@/components/common';

export default function Loading(): JSX.Element {
  return (
    <div className="absolute top-0 left-0 z-100 w-full h-screen flex justify-center items-center bg-gray-900">
      <Spinner />
    </div>
  );
}
