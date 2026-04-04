import handleGetAssignees from "@/api/assignee/handleGetAssignees";
import { useQuery } from "@tanstack/react-query";

export const useGetAssignees = () => {
    return useQuery({
        queryKey: ['assignees'],
        queryFn: handleGetAssignees,
    });
};