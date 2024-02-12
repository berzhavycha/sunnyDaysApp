import * as Types from '@/graphql/__generated__/types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type SignUpMutationVariables = Types.Exact<{
  userDto: Types.Credentials;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'Message', message: string } };


export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userDto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Credentials"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;