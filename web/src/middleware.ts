import { NextRequest, NextResponse } from 'next/server';

import { middleware as activatedMiddleware } from '@/middlewares/config';

export const middleware = async (req: NextRequest, res: NextResponse): Promise<NextResponse> => {
  const middlewareFunctions = activatedMiddleware.map((fn) => fn(req, res));

  const middlewareHeader = [];

  for (const middleware of middlewareFunctions) {
    const result = await middleware;

    if (!result.ok) {
      return result;
    }

    middlewareHeader.push(result.headers);
  }

  let redirectTo = null;

  middlewareHeader.some((header) => {
    const redirect = header.get('x-middleware-request-redirect');
    if (redirect) {
      redirectTo = redirect;
      return true;
    }
    return false;
  });

  if (redirectTo) {
    return NextResponse.redirect(new URL(redirectTo, req.url), {
      status: 307,
    });
  }

  return NextResponse.next({
    request: {
      headers: req.headers,
    },
  });
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
