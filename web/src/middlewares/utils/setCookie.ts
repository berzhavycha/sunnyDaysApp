import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest, NextResponse } from 'next/server';

export const setCookie = (
  request: NextRequest,
  _response: NextResponse,
  cookie: ResponseCookie,
): NextResponse => {
  request.cookies.set(cookie);

  const newResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  newResponse.cookies.set(cookie);
  return newResponse;
};
