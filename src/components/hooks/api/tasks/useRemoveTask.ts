import handleRemoveTask from '@/api/task/handleRemoveTask';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRemoveTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: handleRemoveTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
        onError: (err) => {
            console.error(`Error in removing task: ${err}`);
        }
    });
};