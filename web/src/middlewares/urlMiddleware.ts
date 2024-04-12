import { NextRequest, NextResponse } from 'next/server';

export const urlMiddleware = async (request: NextRequest): Promise<NextResponse> => {
  request.headers.set('x-url', request.url);

  return NextResponse.next({
    request,
  });
};
