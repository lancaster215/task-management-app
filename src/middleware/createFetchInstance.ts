type FetchConfig = RequestInit & { baseURL?: string };

export const createFetchInstance = (baseConfig: FetchConfig) => {
    return async <T>(url: string, config?: RequestInit): Promise<T> => {
        const fullUrl = baseConfig.baseURL ? `${baseConfig.baseURL}${url}` : url;

        // Merge base headers with request-specific headers
        const headers = {
            ...baseConfig.headers,
            ...config?.headers,
        };

        const response = await fetch(fullUrl, {
            ...baseConfig,
            ...config,
            headers,
        });

        // Axios throws on non-2xx status codes by default
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Automatic JSON parsing
        return response.json() as Promise<T>;
    };
};