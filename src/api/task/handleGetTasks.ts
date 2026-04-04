import { BASE_URL } from "@/components/constants/baseURL";
import { Assignee, Task } from "@/pages/dashboard";

export type GetTaskVariable = {
    assignee: Assignee;
};

export default async function handleGetTasks({ assignee }: GetTaskVariable) {
    try {
        const newTasks = await fetch(`${BASE_URL}/api/task`).then(r => r.json());
        const filteredTasks = newTasks.filter((task: Task) => task.assigneeId === assignee.id)

        return filteredTasks || [];
    } catch (err) {
        console.error(`Error in getting tasks: ${err}`)
    }
}