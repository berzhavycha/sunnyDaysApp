import * as Types from '@/graphql/__generated__/types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type UserCitiesWeatherQueryVariables = Types.Exact<{
  citiesLimit: Types.Scalars['Int']['input'];
  forecastDaysAmount: Types.Scalars['Int']['input'];
}>;

export type UserCitiesWeatherQuery = {
  __typename?: 'Query';
  userCitiesWeather: Array<{
    __typename?: 'WeatherForecast';
    city: string;
    tempFahrenheit: number;
    tempCelsius: number;
    text: string;
    humidity: number;
    daysForecast: Array<{
      __typename?: 'WeatherDay';
      tempCelsius: number;
      tempFahrenheit: number;
      text: string;
      humidity: number;
      dayOfWeek: string;
    }>;
  }>;
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
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'citiesLimit' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
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
                name: { kind: 'Name', value: 'citiesLimit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'citiesLimit' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tempFahrenheit' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tempCelsius' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                { kind: 'Field', name: { kind: 'Name', value: 'humidity' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'daysForecast' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'tempCelsius' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'tempFahrenheit' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'humidity' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dayOfWeek' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserCitiesWeatherQuery, UserCitiesWeatherQueryVariables>;
