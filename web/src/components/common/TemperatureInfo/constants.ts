export type Size = 'small' | 'medium' | 'large';
export type FontWeight = 'normal' | 'light' | 'bold';

type ValueClassName = {
  [key in Size]: {
    fontSize: string;
    fontWeight: {
      [key in FontWeight]: string;
    };
    textColor: string;
  };
};

export const valueClassName: ValueClassName = {
  small: {
    fontSize: 'text-sm sm:max-xl:text-sm xl:text-xl',
    fontWeight: {
      normal: 'font-normal',
      light: 'font-light',
      bold: 'font-bold',
    },
    textColor: 'text-white',
  },
  medium: {
    fontSize: 'text-3xl xl:text-4xl',
    fontWeight: {
      normal: 'font-normal',
      light: 'font-light',
      bold: 'font-bold',
    },
    textColor: 'text-white',
  },
  large: {
    fontSize: 'text-2xl sm:text-2xl md:max-lg:text-3xl md:text-5xl',
    fontWeight: {
      normal: 'font-normal',
      light: 'font-light',
      bold: 'font-bold',
    },
    textColor: 'text-white',
  },
};
