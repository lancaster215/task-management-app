import { handleAddAssignee } from '@/api/assignee/handleAddAssignee';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddAssignee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: handleAddAssignee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['assignees'] });
        },
        onError: (err) => {
            console.error(`Error in adding user: ${err}`);
        }
    });
};