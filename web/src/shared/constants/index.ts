export const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const ONE_MINUTE = 1000 * 60;

export const START_PAGE_NUMBER = 1;

export const MD_BREAKPOINT = 768;

export const IS_CLIENT = typeof window !== 'undefined';

export const MOCKED_WEATHER_CARD = {
  id: '',
  city: '',
  celsius: 0,
  fahrenheit: 0,
  text: '',
  humidity: 0,
  precip: 0,
  windSpeed: 0,
  time: '',
  daysForecast: [],
  _deleted: false,
  _loading: false,
};
