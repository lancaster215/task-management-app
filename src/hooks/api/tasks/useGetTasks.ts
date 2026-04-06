import handleGetTasks from "@/api/task/handleGetTasks";
import { useQuery } from "@tanstack/react-query";

export const useGetTasks = (userId: string) => {
    return useQuery({
        queryKey: ['tasks', userId],
        queryFn: () => handleGetTasks({ userId }),
        enabled: !!userId,
    });
};