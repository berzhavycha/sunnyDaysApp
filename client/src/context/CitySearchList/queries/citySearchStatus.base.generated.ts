import * as Types from '@/graphql/__generated__/types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CitySearchStatusQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CitySearchStatusQuery = { __typename?: 'Query', citySearchStatus: boolean };


export const CitySearchStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CitySearchStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"citySearchStatus"}}]}}]} as unknown as DocumentNode<CitySearchStatusQuery, CitySearchStatusQueryVariables>;