import { FC } from 'react';

type Props = {
  content: string | number | JSX.Element;
  onClick: () => Promise<void> | void;
  isActive?: boolean;
  isDisabled?: boolean;
};

export const Button: FC<Props> = ({ content, onClick, isActive, isDisabled }) => {
  const onPress = async (): Promise<void> => {
    if (!isDisabled) {
      await onClick();
    }
  };

  const className = `bg-blue-${isDisabled ? 400 : 600} px-4 text-white py-2 rounded-xl hover:bg-blue-800 hover:border-blue-800 transition-all cursor-pointer`;

  return (
    <button className={className} onClick={onPress} disabled={isDisabled}>
      {content}
    </button>
  );
};
