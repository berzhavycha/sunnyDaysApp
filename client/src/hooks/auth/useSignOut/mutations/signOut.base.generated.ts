import * as Types from '@/graphql/__generated__/types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type SignOutMutationVariables = Types.Exact<{ [key: string]: never }>;

export type SignOutMutation = { __typename?: 'Mutation'; signOut: string };

export const SignOutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignOut' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'signOut' } }],
      },
    },
  ],
} as unknown as DocumentNode<SignOutMutation, SignOutMutationVariables>;
