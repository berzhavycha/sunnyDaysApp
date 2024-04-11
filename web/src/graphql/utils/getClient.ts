import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

import { createClient } from './createClient';


export const { getClient } = registerApolloClient(createClient);
