import { handleRegister } from '@/api/authorization/handleRegister';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: handleRegister,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authorization'] });
        },
        onError: (err) => {
            console.error(`Error in logging in: ${err}`);
        }
    });
};