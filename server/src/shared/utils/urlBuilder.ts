export const urlBuilder = (baseUrl: string, queryParams: { [key: string]: string | string[] | number | undefined }): string => {
    const transformedParams: Record<string, string> = {};
    for (const key in queryParams) {
        const value = queryParams[key];
        if (typeof value === 'number' || value === undefined) {
            transformedParams[key] = String(value);
        } else if (Array.isArray(value)) {
            transformedParams[key] = value.map(String).join(',');
        } else {
            transformedParams[key] = value;
        }
    }

    const searchParams = new URLSearchParams(transformedParams);
    return `${baseUrl}?${searchParams}`;
}
