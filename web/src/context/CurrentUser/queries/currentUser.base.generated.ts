import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

import * as Types from '@/graphql/__generated__/types';

export type CurrentUserQueryVariables = Types.Exact<{ [key: string]: never }>;

export type CurrentUserQuery = {
  __typename?: 'Query';
  currentUser: { __typename?: 'UserPayload'; email: string } | null;
};

export const CurrentUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CurrentUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
