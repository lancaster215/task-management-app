import { BASE_URL } from "@/components/constants/baseURL";
import { TaskFormData } from "@/components/modal/AddTaskModal";

import { Assignee } from "@/pages/dashboard";

export type AddTaskVariables = {
    formData: TaskFormData;
    assignee: Assignee;
};

export default async function handleAddTask({ formData, assignee }: AddTaskVariables) {
    const response = await fetch(`${BASE_URL}/api/addTask`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            ...formData,
            assigneeId: assignee.id
        })
    })

    if (!response.ok) {
        throw new Error('Error adding task');
    }

    return response.json()
}