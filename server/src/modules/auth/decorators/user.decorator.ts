import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { SafeUser } from '@modules/users';

export const CurrentUser = createParamDecorator(
  (field: string, context: ExecutionContext): SafeUser => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    return field ? user?.[field] : user;
  },
);
