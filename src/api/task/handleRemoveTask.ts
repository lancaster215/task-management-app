import { api } from "@/lib/interceptor";
export type RemoveTaskVariables = {
    selected: readonly number[]
    finalUserId: string;
}

export default async function handleRemoveTask({ selected, finalUserId }: RemoveTaskVariables) {
    const response = await api(`/api/removeTask`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({ selected, assigneeId: finalUserId })
    })

    if (!response.ok) {
        throw new Error('Failed to remove task.')
    }

    return response.json();
}