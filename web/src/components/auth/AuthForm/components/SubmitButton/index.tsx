import { FC } from 'react';

import { convertCamelToSpacedPascal } from '@/shared';

type Props = {
  isPending: boolean;
  text: string;
};

export const SubmitButton: FC<Props> = ({ isPending, text }) => {
  return (
    <button
      type="submit"
      className="w-full text-xs bg-blue-700 text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition-all md:text-xl"
    >
      {isPending ? 'Submitiiing...' : convertCamelToSpacedPascal(text)}
    </button>
  );
};
