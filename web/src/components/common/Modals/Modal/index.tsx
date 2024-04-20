import { FC } from 'react';

import { Spinner } from '@/components/common';

type Props = {
  isVisible: boolean;
  text: string;
  onClose: () => void;
  onOk: () => void | Promise<void>;
  loading?: boolean;
  onMouseOverOk?: () => void | Promise<void>;
};

export const Modal: FC<Props> = ({ isVisible, text, loading, onMouseOverOk, onOk, onClose }) => {
  return (
    <div
      className={`${isVisible ? 'flex' : 'hidden'} ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} w-96 md:w-[450px] bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col items-center p-5 pb-3 md:p-8 md:pb-5 rounded-md shadow-lg z-30`}
    >
      <>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h3 className="mb-6 text-md md:text-xl">{text}</h3>
            <div className="w-full flex gap-4 justify-end">
              <button
                onClick={onOk}
                onMouseOver={onMouseOverOk}
                className="text-xs md:text-base px-4 py-2 md:px-4 md:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
              >
                OK
              </button>
              <button
                onClick={onClose}
                className="text-xs md:text-base px-4 py-2 md:px-4 md:py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 hover:text-gray-100 transition-all"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </>
    </div>
  );
};
