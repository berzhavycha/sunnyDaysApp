import { NextRequest } from "next/server";
import { env } from "@/core/env";

export const refreshTokens = async (request: NextRequest): Promise<void> => {
    // we have to use fetch instead of Apollo Client to get access to cookies
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
  };