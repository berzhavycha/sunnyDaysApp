import * as Types from '@/graphql/__generated__/types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type IsUserSignedInQueryVariables = Types.Exact<{ [key: string]: never }>;

export type IsUserSignedInQuery = { __typename?: 'Query'; isUserSignedIn: boolean };

export const IsUserSignedInDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'isUserSignedIn' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'isUserSignedIn' } }],
      },
    },
  ],
} as unknown as DocumentNode<IsUserSignedInQuery, IsUserSignedInQueryVariables>;
