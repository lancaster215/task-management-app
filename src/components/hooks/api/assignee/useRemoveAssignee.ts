import handleRemoveAssignee from "@/api/assignee/handleRemoveAssignee"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useRemoveAssignee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: handleRemoveAssignee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['assignees'] });
        },
        onError: (err) => {
            console.error(`Error in adding user: ${err}`);
        }
    })
}