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
};

export type CityInput = {
  name: Scalars['String']['input'];
};

export type Credentials = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type GeodbCity = {
  __typename?: 'GeodbCity';
  name: Scalars['String']['output'];
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

export type Query = {
  __typename?: 'Query';
  citiesByPrefix: Array<GeodbCity>;
  isUserSignedIn: Maybe<UserPayload>;
  userCitiesWeather: Array<WeatherForecast>;
};


export type QueryCitiesByPrefixArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  prefix: Scalars['String']['input'];
  sort: Scalars['String']['input'];
};


export type QueryUserCitiesWeatherArgs = {
  citiesLimit: Scalars['Int']['input'];
  forecastDaysAmount: Scalars['Int']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  cityId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type UserPayload = {
  __typename?: 'UserPayload';
  email: Scalars['String']['output'];
};

export type WeatherDay = {
  __typename?: 'WeatherDay';
  dayOfWeek: Scalars['String']['output'];
  humidity: Scalars['Int']['output'];
  tempCelsius: Scalars['Float']['output'];
  tempFahrenheit: Scalars['Float']['output'];
  text: Scalars['String']['output'];
};

export type WeatherForecast = {
  __typename?: 'WeatherForecast';
  city: Scalars['String']['output'];
  daysForecast: Array<WeatherDay>;
  humidity: Scalars['Int']['output'];
  tempCelsius: Scalars['Float']['output'];
  tempFahrenheit: Scalars['Float']['output'];
  text: Scalars['String']['output'];
};
