import handleEditTask from '@/api/task/handleEditTask';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: handleEditTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
        onError: (err) => {
            console.error(`Error in editing task: ${err}`);
        }
    });
};