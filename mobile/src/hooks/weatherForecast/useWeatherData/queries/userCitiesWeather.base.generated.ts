import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

import * as Types from '@/graphql/__generated__/types';

export type WeatherForecastFragment = {
  __typename?: 'WeatherForecast';
  id: string;
  city: string;
  celsius: number;
  fahrenheit: number;
  text: string;
  humidity: number;
  _deleted: boolean;
  _loading: boolean;
  daysForecast: Array<{
    __typename?: 'WeatherDay';
    id: string;
    celsius: number;
    fahrenheit: number;
    text: string;
    humidity: number;
    dayOfWeek: string;
  }>;
};

export type UserCitiesWeatherQueryVariables = Types.Exact<{
  offset: Types.Scalars['Int']['input'];
  limit: Types.Scalars['Int']['input'];
  order: Types.Scalars['String']['input'];
  forecastDaysAmount: Types.Scalars['Int']['input'];
}>;

export type UserCitiesWeatherQuery = {
  __typename?: 'Query';
  userCitiesWeather: {
    __typename?: 'PaginatedWeatherForecast';
    edges: Array<{
      __typename?: 'WeatherForecast';
      id: string;
      city: string;
      celsius: number;
      fahrenheit: number;
      text: string;
      humidity: number;
      _deleted: boolean;
      _loading: boolean;
      daysForecast: Array<{
        __typename?: 'WeatherDay';
        id: string;
        celsius: number;
        fahrenheit: number;
        text: string;
        humidity: number;
        dayOfWeek: string;
      }>;
    }>;
    paginationInfo: { __typename?: 'PaginationInfo'; totalCount: number };
  };
};

export const UserCitiesWeatherDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'UserCitiesWeather' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'order' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'forecastDaysAmount' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'userCitiesWeather' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'order' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'forecastDaysAmount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'forecastDaysAmount' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'WeatherForecast' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paginationInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'totalCount' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'WeatherForecast' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'WeatherForecast' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'celsius' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fahrenheit' } },
          { kind: 'Field', name: { kind: 'Name', value: 'text' } },
          { kind: 'Field', name: { kind: 'Name', value: 'humidity' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'daysForecast' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'celsius' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fahrenheit' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                { kind: 'Field', name: { kind: 'Name', value: 'humidity' } },
                { kind: 'Field', name: { kind: 'Name', value: 'dayOfWeek' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: '_deleted' },
            directives: [{ kind: 'Directive', name: { kind: 'Name', value: 'client' } }],
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: '_loading' },
            directives: [{ kind: 'Directive', name: { kind: 'Name', value: 'client' } }],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserCitiesWeatherQuery, UserCitiesWeatherQueryVariables>;
