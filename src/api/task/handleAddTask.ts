import { TaskFormData } from "@/components/modal/AddTaskModal";
import { api } from "@/lib/interceptor";

export type AddTaskVariables = {
    formData: TaskFormData;
    finalUserId: string;
};

export default async function handleAddTask({ formData, finalUserId }: AddTaskVariables) {
    const response = await api(`/api/addTask`, {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            ...formData,
            assigneeId: finalUserId
        })
    })

    if (!response.ok) {
        throw new Error('Error adding task');
    }

    return response.json()
}