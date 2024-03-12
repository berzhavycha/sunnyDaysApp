import { FC } from 'react';
import { buttonStyle } from './constants';
import { convertObjectToTailwind } from '@/shared';

type Props = {
  content: string | number | JSX.Element;
  onClick: () => Promise<void> | void;
  isActive?: boolean;
  isDisabled?: boolean;
  styles?: string;
};

export const Button: FC<Props> = ({ content, onClick, isActive, isDisabled, styles }) => {
  const onPress = async (): Promise<void> => {
    if (!isDisabled) {
      await onClick();
    }
  };

  const isActiveButtonStyle = isActive ? convertObjectToTailwind(buttonStyle['active']) : '';
  const isDisabledButtonStyle = isDisabled
    ? convertObjectToTailwind(buttonStyle['disabled'])
    : convertObjectToTailwind(buttonStyle['undisabled']);

  return (
    <button
      className={`${isActiveButtonStyle} ${isDisabledButtonStyle} px-4 text-white py-2 rounded-xl hover:bg-blue-800 hover:border-blue-800 transition-all cursor-pointer ${styles}`}
      onClick={onPress}
      disabled={isDisabled}
    >
      {content}
    </button>
  );
};
