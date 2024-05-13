import { FC } from 'react';

import { Modal } from '@/components/common';
import { UserCitiesWeatherQuery } from '@/services';

import { useDeleteWeatherCard } from './hooks';

type Props = {
  isVisible: boolean;
  city: string;
  onClose: () => void;
  weatherData?: UserCitiesWeatherQuery;
  isDeletionInProgress: boolean;
  setIsDeletionInProgress: (state: boolean) => void;
};

export const DeletionModal: FC<Props> = ({
  isVisible,
  city,
  onClose,
  weatherData,
  isDeletionInProgress,
  setIsDeletionInProgress,
}) => {
  const { error, onDelete, onMouseOverDeleteBtn } = useDeleteWeatherCard({
    city,
    onClose,
    weatherData,
    setIsDeletionInProgress,
  });

  return (
    <Modal
      error={error}
      isVisible={isVisible}
      onOk={onDelete}
      onMouseOverOk={onMouseOverDeleteBtn}
      onClose={onClose}
      loading={isDeletionInProgress}
      text={`Are you sure you want to delete ${city}?`}
    />
  );
};
