import { FC, startTransition } from 'react';

import { deleteWeatherSubscription } from '@/services';
import { useSubscriptionError, useWeatherCardsList } from '@/context';
import { ApolloError } from '@apollo/client';

type Props = {
  isVisible: boolean;
  city: string;
  onClose: () => void;
};

export const DeletionModal: FC<Props> = ({ isVisible, city, onClose }) => {
  const { errorHandler } = useSubscriptionError();
  const { weatherData } = useWeatherCardsList()

  const onDelete = (): void => {
    startTransition(() => {
      deleteWeatherSubscription(weatherData, city)
        .catch((error) => {
          if (error instanceof ApolloError) {
            errorHandler(error)
          }
        })
        .finally(() => {
          onClose()
        })
    })
  }

  return (
    <div
      className={`${isVisible ? 'flex' : 'hidden'} ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} w-96 md:w-auto bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col items-center p-5 pb-3 md:p-8 md:pb-5 rounded-md shadow-lg z-30`}
    >
      <h3 className="mb-6 text-md md:text-xl">Are you sure you want to delete {city}?</h3>
      <div className="w-full flex gap-4 justify-end">
        <button
          onClick={onDelete}
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
    </div>
  );
};
