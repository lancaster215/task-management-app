import { setMemoryToken } from '@/lib/interceptor';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const useLogout = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    let status: boolean = false

    const logout = async () => {
        status = true
        try {
            // 1. Call the backend to destroy the cookie and clear the DB
            // We use native fetch here because we don't need the interceptor to catch a 401 on logout
            await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.error('Failed to call logout API, forcing local cleanup', error);
        } finally {
            status = false
            // 2. Destroy the Access Token in memory
            setMemoryToken(null);

            // 3. Clear all cached data (tasks, user profile, etc.)
            queryClient.clear();

            // 4. (Optional) Clear anything you put in localStorage
            localStorage.removeItem('userId');

            // 5. Send them back to the login page
            router.push('/login');
        }
    };

    return { status, logout };
};