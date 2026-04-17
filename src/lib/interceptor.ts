/**
 * @description: This intercepts every api call.
 * If the provided API returns 401, this will intercept and call /refresh token
 * to provide a new access token
 */

import { BASE_URL } from "@/constants/baseURL";

// Helper to store access token in memory instead of storing in localStorage
let memoryToken: string | null = null;

export const setMemoryToken = (token: string | null) => {
    memoryToken = token;
};

/**
 * The wrapper function that replaces your 'api' axios instance
 */
let isRefreshing = false;
export const api = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
    const url = `${BASE_URL}${endpoint}`;

    // 1. Request "Interceptor" Logic
    const headers = new Headers(options.headers || {});

    // Set default content type if not present
    if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    // Inject the Bearer token if it exists
    if (memoryToken) {
        headers.set('Authorization', `Bearer ${memoryToken}`);
    }

    const config: RequestInit = {
        ...options,
        headers,
        // Equivalent to withCredentials: true
        credentials: 'include',
    };

    try {
        const response = await fetch(url, config);

        // 2. Response "Interceptor" Logic (handling 401)
        if (response.status === 401) {
            if (isRefreshing) {
                // Optional: You could wait or just redirect
                window.location.href = '/login';
                return response;
            }

            isRefreshing = true;
            try {
                // Attempt to refresh the token
                const refreshResponse = await fetch(`${BASE_URL}/api/refresh`, {
                    method: 'POST',
                    credentials: 'include', // Important to send the HttpOnly refresh cookie
                    headers: { 'Content-Type': 'application/json' },
                });

                if (refreshResponse.ok) {
                    const data = await refreshResponse.json();
                    memoryToken = data.accessToken;
                    isRefreshing = false;

                    // 3. Retry Logic
                    // Update the header with the new token and retry the original call
                    headers.set('Authorization', `Bearer ${memoryToken}`);
                    return await fetch(url, { ...config, headers });
                } else {
                    // Refresh failed (cookie expired or invalid)
                    throw new Error('Refresh failed');
                }
            } catch (err) {
                isRefreshing = false;
                // Log user out if refresh fails
                memoryToken = null;
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                return response; // Return the original 401
            }
        }

        return response;
    } catch (error) {
        // Handle network errors
        return Promise.reject(error);
    }
};