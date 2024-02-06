export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

/** Info about the current connection page slice */
export type ConnectionPageInfo = {
  __typename?: 'ConnectionPageInfo';
  /** The opaque id of the cursor representing the index of the last element in this page */
  endCursor: Scalars['String']['output'];
  /** Whether there are more pages in the results */
  hasNextPage: Scalars['Boolean']['output'];
  /** Whether there are previous pages in the results */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** The opaque id of the cursor representing the index of the first element in this page */
  startCursor: Scalars['String']['output'];
};

/** A pageable view into country results */
export type CountriesConnection = {
  __typename?: 'CountriesConnection';
  /** The edges in the current page of results */
  edges: Array<Maybe<CountryEdge>>;
  /** Info about the current page of results */
  pageInfo: ConnectionPageInfo;
  /** The total number of results */
  totalCount: Scalars['Int']['output'];
};

/** A country */
export type Country = {
  __typename?: 'Country';
  /** The country dialing prefix */
  callingCode: Scalars['String']['output'];
  /** The country's capital city */
  capital: Maybe<Scalars['String']['output']>;
  /** The ISO-3166 country code */
  code: Scalars['ID']['output'];
  /** A list of supported ISO-4217 currency codes */
  currencyCodes: Array<Maybe<Scalars['String']['output']>>;
  /** The country flag image */
  flagImageUri: Scalars['String']['output'];
  /** The country name */
  name: Scalars['String']['output'];
  /** The number of regions in this country */
  numRegions: Scalars['Int']['output'];
  /** Find populated places in this country */
  populatedPlaces: Maybe<CountryPopulatedPlacesConnection>;
  /** Look up a region in this country */
  region: Maybe<CountryRegion>;
  /** Find regions in this country */
  regions: Maybe<CountryRegionsConnection>;
  /** The country WikiData id */
  wikiDataId: Scalars['ID']['output'];
};

/** A country */
export type CountryPopulatedPlacesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeDeleted?: InputMaybe<IncludeDeletedFilterType>;
  last: InputMaybe<Scalars['Int']['input']>;
  maxPopulation: InputMaybe<Scalars['Int']['input']>;
  minPopulation: InputMaybe<Scalars['Int']['input']>;
  namePrefix: InputMaybe<Scalars['String']['input']>;
  namePrefixDefaultLangResults: InputMaybe<Scalars['Boolean']['input']>;
  sort: InputMaybe<Scalars['String']['input']>;
  timeZoneIds: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  types: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** A country */
export type CountryRegionArgs = {
  code: InputMaybe<Scalars['ID']['input']>;
};

/** A country */
export type CountryRegionsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  namePrefix: InputMaybe<Scalars['String']['input']>;
  namePrefixDefaultLangResults: InputMaybe<Scalars['Boolean']['input']>;
  sort: InputMaybe<Scalars['String']['input']>;
};

/** When paging countries, wraps a country node together with the cursor referencing its position in the results */
export type CountryEdge = {
  __typename?: 'CountryEdge';
  /** The cursor id referencing the position of this node in the results */
  cursor: Scalars['String']['output'];
  /** The node value */
  node: Country;
};

/** A pageable view into country populated-place results */
export type CountryPopulatedPlacesConnection = {
  __typename?: 'CountryPopulatedPlacesConnection';
  /** The edges in the current page of results */
  edges: Array<Maybe<PopulatedPlaceEdge>>;
  /** Info about the current page of results */
  pageInfo: ConnectionPageInfo;
  /** The total number of results */
  totalCount: Scalars['Int']['output'];
};

/** A region in a country. This could be a state, province, district, or otherwise major political division. */
export type CountryRegion = {
  __typename?: 'CountryRegion';
  /** The region's capital city */
  capital: Maybe<Scalars['String']['output']>;
  /** The region this region is in, if any */
  containingRegion: Maybe<CountryRegion>;
  /** The region's country */
  country: Country;
  /** The region FIPS 10-4 code */
  fipsCode: Maybe<Scalars['ID']['output']>;
  /** The region ISO-3166 code */
  isoCode: Scalars['ID']['output'];
  /** The region name */
  name: Scalars['String']['output'];
  /** The number of populated places in this region */
  numPopulatedPlaces: Maybe<Scalars['Int']['output']>;
  /** Find populated places in this region */
  populatedPlaces: Maybe<RegionPopulatedPlacesConnection>;
  /** The region WikiData id */
  wikiDataId: Maybe<Scalars['ID']['output']>;
};

/** A region in a country. This could be a state, province, district, or otherwise major political division. */
export type CountryRegionPopulatedPlacesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeDeleted?: InputMaybe<IncludeDeletedFilterType>;
  last: InputMaybe<Scalars['Int']['input']>;
  maxPopulation: InputMaybe<Scalars['Int']['input']>;
  minPopulation: InputMaybe<Scalars['Int']['input']>;
  namePrefix: InputMaybe<Scalars['String']['input']>;
  namePrefixDefaultLangResults: InputMaybe<Scalars['Boolean']['input']>;
  sort: InputMaybe<Scalars['String']['input']>;
  timeZoneIds: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  types: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** When paging regions, wraps a region node together with the cursor referencing its position in the results */
export type CountryRegionEdge = {
  __typename?: 'CountryRegionEdge';
  /** The cursor id referencing the position of this node in the results */
  cursor: Scalars['String']['output'];
  /** The node value */
  node: CountryRegion;
};

/** A pageable view into region results */
export type CountryRegionsConnection = {
  __typename?: 'CountryRegionsConnection';
  /** The edges in the current page of results */
  edges: Array<Maybe<CountryRegionEdge>>;
  /** Info about the current page of results */
  pageInfo: ConnectionPageInfo;
  /** The total number of results */
  totalCount: Scalars['Int']['output'];
};

/** A pageable view into currency results */
export type CurrenciesConnection = {
  __typename?: 'CurrenciesConnection';
  /** The edges in the current page of results */
  edges: Array<Maybe<CurrencyEdge>>;
  /** Info about the current page of results */
  pageInfo: ConnectionPageInfo;
  /** The total number of results */
  totalCount: Scalars['Int']['output'];
};

/** A country currency */
export type Currency = {
  __typename?: 'Currency';
  code: Scalars['ID']['output'];
  countryCodes: Array<Maybe<Scalars['ID']['output']>>;
  symbol: Scalars['String']['output'];
};

/** When paging currencies, wraps a currency node together with the cursor referencing its position in the results */
export type CurrencyEdge = {
  __typename?: 'CurrencyEdge';
  /** The cursor id referencing the position of this node in the results */
  cursor: Scalars['String']['output'];
  /** The node value */
  node: Currency;
};

/** How the results should be rendered */
export type DisplayOptions = {
  /** Whether to display results using ASCII-only characters */
  asciiMode: InputMaybe<Scalars['Boolean']['input']>;
  /** What language to display the results in */
  language: InputMaybe<Language>;
};

/** The unit of distance to use when considering a distance arg (for example, in location-related criteria) */
export enum DistanceUnit {
  /** Kilometers */
  Km = 'KM',
  /** Miles */
  Mi = 'MI',
}

/** What level of stale data is ok to pull */
export enum IncludeDeletedFilterType {
  /** All data, regardless of if/when marked deleted */
  All = 'ALL',
  /** Only data not marked deleted */
  None = 'NONE',
  /** Only data not marked deleted before last week */
  SinceLastWeek = 'SINCE_LAST_WEEK',
  /** Only data not marked deleted before yesterday */
  SinceYesterday = 'SINCE_YESTERDAY',
}

/** The languages currently supported */
export enum Language {
  /** German */
  De = 'DE',
  /** English */
  En = 'EN',
  /** Spanish */
  Es = 'ES',
  /** French */
  Fr = 'FR',
  /** Italian */
  It = 'IT',
  /** Portuguese */
  Pt = 'PT',
  /** Portuguese (Brazil) */
  PtBr = 'PT_BR',
  /** Russian */
  Ru = 'RU',
}

/** A regional locale representing some country/language combination */
export type Locale = {
  __typename?: 'Locale';
  code: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

/** When paging locales, wraps a locale node together with the cursor referencing its position in the results */
export type LocaleEdge = {
  __typename?: 'LocaleEdge';
  /** The cursor id referencing the position of this node in the results */
  cursor: Scalars['String']['output'];
  /** The node value */
  node: Locale;
};

/** A pageable view into locale results */
export type LocalesConnection = {
  __typename?: 'LocalesConnection';
  /** The edges in the current page of results */
  edges: Array<Maybe<LocaleEdge>>;
  /** Info about the current page of results */
  pageInfo: ConnectionPageInfo;
  /** The total number of results */
  totalCount: Scalars['Int']['output'];
};

/** Location GPS latitude/longitude coordinates */
export type Location = {
  /** DD.DDDD from -90 to 90 */
  latitude: InputMaybe<Scalars['Float']['input']>;
  /** DD.DDDD from -180 to 180 */
  longitude: InputMaybe<Scalars['Float']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addWeatherSubscription: Subscription;
  deleteWeatherSubscription: Subscription;
  refreshAccess: Scalars['String']['output'];
  signIn: Scalars['String']['output'];
  signOut: Scalars['String']['output'];
  signUp: Scalars['String']['output'];
};

export type MutationAddWeatherSubscriptionArgs = {
  city: Scalars['String']['input'];
};

export type MutationDeleteWeatherSubscriptionArgs = {
  city: Scalars['String']['input'];
};

export type MutationSignInArgs = {
  userInput: UserInput;
};

export type MutationSignUpArgs = {
  userInput: UserInput;
};

/** A pageable view into nearby populated-place results */
export type NearbyPopulatedPlacesConnection = {
  __typename?: 'NearbyPopulatedPlacesConnection';
  /** The edges in the current page of results */
  edges: Array<Maybe<PopulatedPlaceEdge>>;
  /** Info about the current page of results */
  pageInfo: ConnectionPageInfo;
  /** The total number of results */
  totalCount: Scalars['Int']['output'];
};

/** A place with some population of inhabitants */
export type PopulatedPlace = {
  __typename?: 'PopulatedPlace';
  /** The place's country */
  country: Country;
  /** If this place has been marked deleted */
  deleted: Scalars['Boolean']['output'];
  /**
   * The distance result from some location-based query
   * This field has two forms:
   * - As a property (e.g., place.distance), returns the distance as part of a query returning places sorted by distance.
   * - As a function (e.g., place.distance(toPlaceId), returns the distance to the specified place.
   */
  distance: Maybe<Scalars['Float']['output']>;
  /** The place elevation (meters) above sea level */
  elevationMeters: Maybe<Scalars['Int']['output']>;
  /** The place native id */
  id: Scalars['ID']['output'];
  /** The place latittude (-90.0 to 90.0) */
  latitude: Maybe<Scalars['Float']['output']>;
  /** The place containing this place, if any */
  locatedIn: Maybe<PopulatedPlace>;
  /** The place longitude (-180.0 to 180.0) */
  longitude: Maybe<Scalars['Float']['output']>;
  /** The place name */
  name: Scalars['String']['output'];
  /** Find nearby populated places */
  nearbyPopulatedPlaces: Maybe<NearbyPopulatedPlacesConnection>;
  /** The place type */
  placeType: PopulatedPlaceType;
  /** The place population */
  population: Scalars['Int']['output'];
  /** The place's region */
  region: Maybe<CountryRegion>;
  /** The place timezone id */
  timezone: Scalars['String']['output'];
  /** The place WikiData id */
  wikiDataId: Maybe<Scalars['ID']['output']>;
};

/** A place with some population of inhabitants */
export type PopulatedPlaceDistanceArgs = {
  distanceUnit?: InputMaybe<DistanceUnit>;
  toPlaceId: InputMaybe<Scalars['ID']['input']>;
};

/** A place with some population of inhabitants */
export type PopulatedPlaceNearbyPopulatedPlacesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  countryIds: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  distanceUnit?: InputMaybe<DistanceUnit>;
  excludedCountryIds: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeDeleted?: InputMaybe<IncludeDeletedFilterType>;
  last: InputMaybe<Scalars['Int']['input']>;
  maxPopulation: InputMaybe<Scalars['Int']['input']>;
  minPopulation: InputMaybe<Scalars['Int']['input']>;
  namePrefix: InputMaybe<Scalars['String']['input']>;
  namePrefixDefaultLangResults: InputMaybe<Scalars['Boolean']['input']>;
  radius?: InputMaybe<Scalars['Float']['input']>;
  sort: InputMaybe<Scalars['String']['input']>;
  timeZoneIds: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  types: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** When paging populated places, wraps a place node together with the cursor referencing its position in the results */
export type PopulatedPlaceEdge = {
  __typename?: 'PopulatedPlaceEdge';
  /** The cursor id referencing the position of this node in the results */
  cursor: Scalars['String']['output'];
  /** The node value */
  node: PopulatedPlace;
};

/** The populated-place types currently supported */
export enum PopulatedPlaceType {
  /** A level-2 administrative division (for example, a county) */
  Adm2 = 'ADM2',
  /** A city, town, or village */
  City = 'CITY',
  /** An island */
  Island = 'ISLAND',
}

/** A pageable view into populated-place results */
export type PopulatedPlacesConnection = {
  __typename?: 'PopulatedPlacesConnection';
  /** The edges in the current page of results */
  edges: Array<Maybe<PopulatedPlaceEdge>>;
  /** Info about the current page of results */
  pageInfo: ConnectionPageInfo;
  /** The total number of results */
  totalCount: Scalars['Int']['output'];
};

/** The set of possible top-level queries */
export type Query = {
  __typename?: 'Query';
  /** Find countries, filtering by optional criteria. If no criteria are set, you will get back all known countries. */
  countries: Maybe<CountriesConnection>;
  /** Look up a country */
  country: Maybe<Country>;
  /** Find currencies, filtering by optional criteria. If no criteria are set, you will get back all known currencies. */
  currencies: Maybe<CurrenciesConnection>;
  /** Get the distance between any two places */
  distanceBetween: Maybe<Scalars['Float']['output']>;
  isUserSignedIn: Scalars['Boolean']['output'];
  /** Get all known locales */
  locales: Maybe<LocalesConnection>;
  /** Look up a populated place */
  populatedPlace: Maybe<PopulatedPlace>;
  /** Find populated places, filtering by optional criteria. If no criteria are set, you will get back all known places. */
  populatedPlaces: Maybe<PopulatedPlacesConnection>;
  /** Look up a time-zone */
  timeZone: Maybe<TimeZone>;
  /** Get all known time-zones */
  timeZones: Maybe<TimeZonesConnection>;
  userCitiesWeather: Array<WeatherForecast>;
};

/** The set of possible top-level queries */
export type QueryCountriesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  currencyCode: InputMaybe<Scalars['String']['input']>;
  displayOptions: InputMaybe<DisplayOptions>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  namePrefix: InputMaybe<Scalars['String']['input']>;
  namePrefixDefaultLangResults?: InputMaybe<Scalars['Boolean']['input']>;
  sort: InputMaybe<Scalars['String']['input']>;
};

/** The set of possible top-level queries */
export type QueryCountryArgs = {
  displayOptions: InputMaybe<DisplayOptions>;
  id: Scalars['ID']['input'];
};

/** The set of possible top-level queries */
export type QueryCurrenciesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  countryId: InputMaybe<Scalars['ID']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
};

/** The set of possible top-level queries */
export type QueryDistanceBetweenArgs = {
  distanceUnit?: InputMaybe<DistanceUnit>;
  fromPlaceId: Scalars['ID']['input'];
  toPlaceId: Scalars['ID']['input'];
};

/** The set of possible top-level queries */
export type QueryLocalesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
};

/** The set of possible top-level queries */
export type QueryPopulatedPlaceArgs = {
  displayOptions: InputMaybe<DisplayOptions>;
  id: Scalars['ID']['input'];
};

/** The set of possible top-level queries */
export type QueryPopulatedPlacesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  countryIds: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  displayOptions: InputMaybe<DisplayOptions>;
  distanceUnit?: InputMaybe<DistanceUnit>;
  excludedCountryIds: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  first: InputMaybe<Scalars['Int']['input']>;
  includeDeleted?: InputMaybe<IncludeDeletedFilterType>;
  last: InputMaybe<Scalars['Int']['input']>;
  location: InputMaybe<Location>;
  maxPopulation: InputMaybe<Scalars['Int']['input']>;
  minPopulation: InputMaybe<Scalars['Int']['input']>;
  namePrefix: InputMaybe<Scalars['String']['input']>;
  namePrefixDefaultLangResults: InputMaybe<Scalars['Boolean']['input']>;
  radius?: InputMaybe<Scalars['Float']['input']>;
  sort: InputMaybe<Scalars['String']['input']>;
  timeZoneIds: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  types: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** The set of possible top-level queries */
export type QueryTimeZoneArgs = {
  id: Scalars['ID']['input'];
};

/** The set of possible top-level queries */
export type QueryTimeZonesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
};

/** The set of possible top-level queries */
export type QueryUserCitiesWeatherArgs = {
  citiesLimit: Scalars['Int']['input'];
  forecastDaysAmount: Scalars['Int']['input'];
};

/** A pageable view into regional populated-place results */
export type RegionPopulatedPlacesConnection = {
  __typename?: 'RegionPopulatedPlacesConnection';
  /** The edges in the current page of results */
  edges: Array<Maybe<PopulatedPlaceEdge>>;
  /** Info about the current page of results */
  pageInfo: ConnectionPageInfo;
  /** The total number of results */
  totalCount: Scalars['Int']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  cityName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

/** A time-zone */
export type TimeZone = {
  __typename?: 'TimeZone';
  dateTime: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rawUtcOffsetHours: Scalars['Int']['output'];
  time: Scalars['String']['output'];
};

/** When paging time-zones, wraps a time-zone node together with the cursor referencing its position in the results */
export type TimeZoneEdge = {
  __typename?: 'TimeZoneEdge';
  /** The cursor id referencing the position of this node in the results */
  cursor: Scalars['String']['output'];
  /** The node value */
  node: TimeZone;
};

/** A pageable view into time-zone results */
export type TimeZonesConnection = {
  __typename?: 'TimeZonesConnection';
  /** The edges in the current page of results */
  edges: Array<Maybe<TimeZoneEdge>>;
  /** Info about the current page of results */
  pageInfo: ConnectionPageInfo;
  /** The total number of results */
  totalCount: Scalars['Int']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
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
