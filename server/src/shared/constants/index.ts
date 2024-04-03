export const ONE_DAY_SECONDS = 60 * 60 * 24;
export const ONE_DAY_MILLISECONDS = ONE_DAY_SECONDS * 1000;

export const TOO_MANY_REQUESTS_ERROR_CODE = 429;

export const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export enum HttpStatusCode {
  INFO = 100,
  SUCCESS = 200,
  REDIRECTION = 300,
  CLIENT_ERROR = 400,
  SERVER_ERROR = 500,
}

export enum NODE_ENV {
  development = 'development',
  production = 'production',
  test = 'test'
}