import { NextRequest, NextResponse } from 'next/server';

import { CurrentUserDocument } from '@/context/CurrentUser/queries';
import { env } from '@/core/env';
import { createClient } from '@/graphql';
import { START_PAGE_NUMBER } from '@/shared';

export const authMiddleware = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const apolloClient = createClient();

    const tokens = request.cookies.get('tokens');

    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const userResponse = await apolloClient.query({
      query: CurrentUserDocument,
    });

    console.log(userResponse.data, tokens, url.pathname);

    if (userResponse.data.currentUser) {
      if (url.pathname !== '/weather-forecast') {
        const page = +(searchParams.get('page') ?? START_PAGE_NUMBER);
        const limit = +(searchParams.get('perPage') ?? env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT);
        const order = searchParams.get('order') ?? env.NEXT_PUBLIC_WEATHER_CITIES_ORDER;

        request.headers.set(
          'redirect',
          `/weather-forecast?page=${page}&perPage=${limit}&order=${order}`,
        );
      }
    } else if (tokens) {
      const response = await fetch(env.NEXT_PUBLIC_BASE_URL, {
        method: 'POST',
        body: JSON.stringify({
          query: `
                            mutation RefreshAccess {
                                refreshAccess {
                                    message
                                }
                            }
                        `,
        }),
        headers: {
          'Content-Type': 'application/json',
          Cookie: request.headers.get('cookie') ?? '',
        },
      });

      console.log('RESPONSE', response.ok);
      const setCookiesHeader = response.headers.get('set-cookie') ?? '';

      const cookies = setCookiesHeader.split(',');
      for (const cookie of cookies) {
        if (cookie.includes('tokens=')) {
          const tokensCookie = cookie.split(';')[0].trim();
          const decodedTokens = decodeURIComponent(tokensCookie);
          const tokens = decodedTokens.split('=')[1];
          request.cookies.set('tokens', tokens);
          request.headers.append('Set-Cookie', `tokens=${tokens}; Path=/;`);
        }
      }

      if (url.pathname !== '/weather-forecast') {
        const page = +(searchParams.get('page') ?? START_PAGE_NUMBER);
        const limit = +(searchParams.get('perPage') ?? env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT);
        const order = searchParams.get('order') ?? env.NEXT_PUBLIC_WEATHER_CITIES_ORDER;

        request.headers.set(
          'redirect',
          `/weather-forecast?page=${page}&perPage=${limit}&order=${order}`,
        );
      }
    } else if (url.pathname !== '/sign-in') {
      request.headers.set('redirect', `/sign-in`);
    }

    return NextResponse.next({
      request,
    });
  } catch (error) {
    NextResponse.error();
  }

  return NextResponse.next({
    request,
  });
};
