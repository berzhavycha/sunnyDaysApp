import { IUser } from '@modules/users';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (field: string, context: ExecutionContext): IUser => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    return field ? user?.[field] : user
  },
);
