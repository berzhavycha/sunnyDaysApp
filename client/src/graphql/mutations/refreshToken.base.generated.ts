import * as Types from '@/graphql/__generated__/types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type RefreshAccessMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type RefreshAccessMutation = { __typename?: 'Mutation', refreshAccess: { __typename?: 'Message', message: string } };


export const RefreshAccessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshAccess"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshAccess"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RefreshAccessMutation, RefreshAccessMutationVariables>;