import { NextResponse } from 'next/server';

export const middleware = (request: Request): NextResponse => {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};