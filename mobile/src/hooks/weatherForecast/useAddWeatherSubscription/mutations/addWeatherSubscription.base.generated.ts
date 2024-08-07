import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

import * as Types from '@/graphql/__generated__/types';

export type AddWeatherSubscriptionMutationVariables = Types.Exact<{
  city: Types.CityInput;
}>;

export type AddWeatherSubscriptionMutation = {
  __typename?: 'Mutation';
  addWeatherSubscription: { __typename?: 'Subscription'; id: string };
};

export const AddWeatherSubscriptionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddWeatherSubscription' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'city' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CityInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addWeatherSubscription' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'city' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AddWeatherSubscriptionMutation,
  AddWeatherSubscriptionMutationVariables
>;
