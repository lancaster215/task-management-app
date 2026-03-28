import handleGetTasks from "@/api/task/handleGetTasks";
import { Assignee } from "@/pages/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useGetTasks = (assignee: Assignee) => {
    return useQuery({
        queryKey: ['tasks', assignee.id],
        queryFn: () => handleGetTasks({ assignee }),
        enabled: !!assignee?.id,
    });
};