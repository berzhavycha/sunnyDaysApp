import { FC } from 'react';

import { Modal } from '@/components/common';

import { useDeleteWeatherCard } from './hooks';

type Props = {
  isVisible: boolean;
  city: string;
  onClose: () => void;
};

export const DeletionModal: FC<Props> = ({ isVisible, city, onClose }) => {
  const { isDeletionInProgress, onDelete, onMouseOverDeleteBtn } = useDeleteWeatherCard({
    city,
    onClose,
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
