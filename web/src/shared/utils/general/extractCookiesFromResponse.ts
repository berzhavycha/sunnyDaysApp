export const extractCookiesFromResponse = (response: Response, cookieName: string): string | null => {
    const setCookiesHeader = response.headers.get('set-cookie') ?? '';
    const cookies = setCookiesHeader.split(',');
    for (const cookie of cookies) {
        if (cookie.includes(`${cookieName}=`)) {
            const tokensCookie = cookie.split(';')[0].trim();
            const decodedTokens = decodeURIComponent(tokensCookie);
            const tokens = decodedTokens.split('=')[1];
            return tokens;
        }
    }

    return null;
}