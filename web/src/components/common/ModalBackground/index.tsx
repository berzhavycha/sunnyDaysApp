import { FC } from 'react';
import { CloseButton } from '../Buttons/CloseButton';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  zIndex?: number
};

export const ModalBackground: FC<Props> = ({ isVisible, onClose, zIndex }) => {
  return (
    <>
      {isVisible ? (
        <div className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 z-${zIndex ?? 10}`}>
          <div className="text-right p-4">
            <CloseButton onClick={onClose} />
          </div>
        </div>
      ) : null}
    </>
  );
};
