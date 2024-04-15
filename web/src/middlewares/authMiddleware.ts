import { NextRequest, NextResponse } from 'next/server';

import { CurrentUserDocument } from '@/context/CurrentUser/queries';
import { UNEXPECTED_ERROR_MESSAGE, createClient } from '@/graphql';

import { redirectToWeatherForecast, refreshTokens } from './utils';

export const authMiddleware = async (request: NextRequest): Promise<NextResponse> => {
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
    } else if (tokens) {
      await refreshTokens(request);
      if (pathname !== '/weather-forecast') {
        redirectToWeatherForecast(request, url.searchParams);
      }
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
      }
    })
  }
};
