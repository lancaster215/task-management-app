import handleAddTask from '@/api/task/handleAddTask';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: handleAddTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
        onError: (err) => {
            console.error(`Error in adding task: ${err}`);
        }
    });
};