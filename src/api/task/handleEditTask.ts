import { BASE_URL } from "@/components/constants/baseURL"
import { TaskFormData } from "@/components/modal/AddTaskModal"
import { Assignee } from "@/pages/dashboard"

export type EditTaskVariables = {
    formData: TaskFormData,
    assignee: Assignee
}

export default async function handleEditTask({ formData, assignee }: EditTaskVariables) {
    const response = await fetch(`${BASE_URL}/api/editTask`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...formData,
            assigneeId: assignee.id
        })
    })

    if (!response.ok) {
        throw new Error('Failed editing task');
    }

    return response.json()
}