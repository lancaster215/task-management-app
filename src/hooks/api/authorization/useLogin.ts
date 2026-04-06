import { handleLogin } from '@/api/authorization/handleLogin';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: handleLogin,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authorization'] });
        },
        onError: (err) => {
            console.error(`Error in logging in: ${err}`);
        }
    });
};