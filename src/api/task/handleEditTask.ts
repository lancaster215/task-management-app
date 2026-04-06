import { TaskFormData } from "@/components/modal/AddTaskModal"
import { api } from "@/lib/interceptor"

export type EditTaskVariables = {
    formData: TaskFormData,
    finalUserId: string
}

export default async function handleEditTask({ formData, finalUserId }: EditTaskVariables) {
    const response = await api(`/api/editTask`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...formData,
            assigneeId: finalUserId
        })
    })

    if (!response.ok) {
        throw new Error('Failed editing task');
    }

    return response.json()
}