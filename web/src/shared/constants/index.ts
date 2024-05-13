export const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export enum AuthType {
  SIGN_UP = 'signUp',
  SIGN_IN = 'signIn',
}

export const UNAUTHORIZED_ERROR_CODE = 401;

export const ONE_DAY_SECONDS = 60 * 60 * 24;

export const ONE_DAY_MILLISECONDS = ONE_DAY_SECONDS * 1000;

export const ONE_MINUTE = 1000 * 60;

export const START_PAGE_NUMBER = 1;

export const MD_BREAKPOINT = 768;

export const IS_CLIENT = typeof window !== 'undefined';

export enum NODE_ENV {
  development = 'development',
  production = 'production',
  test = 'test',
}
