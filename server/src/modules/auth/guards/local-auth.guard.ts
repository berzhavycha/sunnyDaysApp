import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext();
    req.body = ctx.getArgs().input;
    return req;
  }
}
