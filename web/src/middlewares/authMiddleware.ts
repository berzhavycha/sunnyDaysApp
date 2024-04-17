import { NextRequest, NextResponse } from 'next/server';

import { CurrentUserDocument } from '@/context/CurrentUser/queries';
import { env } from '@/core/env';
import { createClient, UNEXPECTED_ERROR_MESSAGE } from '@/graphql';
import { NODE_ENV, ONE_DAY_MILLISECONDS, OriginalError, UNAUTHORIZED_ERROR_CODE } from '@/shared';

import { redirectToWeatherForecast, refreshTokens, setCookie } from './utils';

export const authMiddleware = async (
  request: NextRequest,
  response: NextResponse,
): Promise<NextResponse> => {
  try {
    const apolloClient = createClient();
    const tokens = request.cookies.get('tokens');
    const url = new URL(request.url);
    const pathname = url.pathname;

    const userResponse = await apolloClient.query({
      query: CurrentUserDocument,
    });

    if (userResponse.data.currentUser) {
      if (pathname !== '/weather-forecast') {
        redirectToWeatherForecast(request, url.searchParams);
      }
    } else if (
      tokens &&
      userResponse.errors &&
      (userResponse.errors[0].extensions.originalError as OriginalError).statusCode ===
        UNAUTHORIZED_ERROR_CODE
    ) {
      const tokens = await refreshTokens(request);
      if (pathname !== '/weather-forecast') {
        redirectToWeatherForecast(request, url.searchParams);
      }

      const nextResponse = setCookie(request, response, {
        name: 'tokens',
        value: tokens,
        httpOnly: true,
        maxAge: ONE_DAY_MILLISECONDS * env.COOKIE_EXPIRATION_DAYS_TIME,
        sameSite: 'lax',
        secure: env.NODE_ENV === NODE_ENV.production,
      });
      return nextResponse;
    } else if (pathname !== '/sign-in' && pathname !== '/sign-up') {
      request.headers.set('redirect', `/sign-in`);
    }

    return NextResponse.next({
      request,
    });
  } catch (error) {
    return NextResponse.json({
      error: {
        message: UNEXPECTED_ERROR_MESSAGE,
      },
    });
  }
};
