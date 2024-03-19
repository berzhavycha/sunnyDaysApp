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
      className="w-full text-xs md:text-xl bg-blue-700 text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition-all"
    >
      {isPending ? 'Submitiiing...' : convertCamelToSpacedPascal(text)}
    </button>
  );
};
