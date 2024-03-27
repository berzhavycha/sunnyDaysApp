/* eslint-disable @typescript-eslint/no-explicit-any */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CityInput = {
  name: Scalars['String']['input'];
};

export type Credentials = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addWeatherSubscription: Subscription;
  deleteWeatherSubscription: Subscription;
  refreshAccess: Message;
  signIn: UserPayload;
  signOut: Message;
  signUp: UserPayload;
};


export type MutationAddWeatherSubscriptionArgs = {
  input: CityInput;
};


export type MutationDeleteWeatherSubscriptionArgs = {
  input: CityInput;
};


export type MutationSignInArgs = {
  input: Credentials;
};


export type MutationSignUpArgs = {
  input: Credentials;
};

export type PaginatedWeatherForecast = {
  __typename?: 'PaginatedWeatherForecast';
  edges: Array<WeatherForecast>;
  paginationInfo: PaginationInfo;
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  citiesByPrefix: Array<SearchedCity>;
  citySearchStatus: Scalars['Boolean']['output'];
  currentUser: Maybe<UserPayload>;
  userCitiesWeather: PaginatedWeatherForecast;
};


export type QueryCitiesByPrefixArgs = {
  limit: Scalars['Int']['input'];
  minPopulation: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  prefix: Scalars['String']['input'];
  sort: Scalars['String']['input'];
};


export type QueryUserCitiesWeatherArgs = {
  forecastDaysAmount: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  order: Scalars['String']['input'];
};

export type SearchedCity = {
  __typename?: 'SearchedCity';
  country: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  cityId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type UserPayload = {
  __typename?: 'UserPayload';
  email: Scalars['String']['output'];
};

export type WeatherDay = {
  __typename?: 'WeatherDay';
  celsius: Scalars['Float']['output'];
  dayOfWeek: Scalars['String']['output'];
  fahrenheit: Scalars['Float']['output'];
  humidity: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  maxCelsius: Scalars['Float']['output'];
  maxFahrenheit: Scalars['Float']['output'];
  minCelsius: Scalars['Float']['output'];
  minFahrenheit: Scalars['Float']['output'];
  precip: Scalars['Float']['output'];
  text: Scalars['String']['output'];
  windSpeed: Scalars['Float']['output'];
};

export type WeatherForecast = {
  __typename?: 'WeatherForecast';
  _deleted: Scalars['Boolean']['output'];
  _loading: Scalars['Boolean']['output'];
  celsius: Scalars['Float']['output'];
  city: Scalars['String']['output'];
  daysForecast: Array<WeatherDay>;
  fahrenheit: Scalars['Float']['output'];
  humidity: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  precip: Scalars['Float']['output'];
  text: Scalars['String']['output'];
  time: Scalars['String']['output'];
  windSpeed: Scalars['Float']['output'];
};
