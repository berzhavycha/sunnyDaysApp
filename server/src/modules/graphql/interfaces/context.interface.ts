import { Request, Response } from 'express-serve-static-core';
import { GraphQLExecutionContext } from '@nestjs/graphql';

import { SafeUser } from '@modules/users';

export interface ExtendedGraphQLContext extends GraphQLExecutionContext {
  req: Request;
  res: Response;
  user: SafeUser;
}
