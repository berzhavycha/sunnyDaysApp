import { FC } from 'react';

import { Modal } from '@/components/common';

import { useDeleteWeatherCard } from './hooks';
import { UserCitiesWeatherQuery } from '@/services';

type Props = {
  isVisible: boolean;
  city: string;
  onClose: () => void;
  weatherData?: UserCitiesWeatherQuery
};

export const DeletionModal: FC<Props> = ({ isVisible, city, onClose, weatherData }) => {
  const { isDeletionInProgress, onDelete, onMouseOverDeleteBtn } = useDeleteWeatherCard({
    city,
    onClose,
    weatherData
  });

  return (
    <Modal
      isVisible={isVisible}
      onOk={onDelete}
      onMouseOverOk={onMouseOverDeleteBtn}
      onClose={onClose}
      loading={isDeletionInProgress}
      text={`Are you sure you want to delete ${city}?`}
    />
  );
};

