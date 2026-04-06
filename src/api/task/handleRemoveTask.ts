import { api } from "@/lib/interceptor";

export default async function handleRemoveTask(selected: readonly number[]) {
    const response = await api(`/api/removeTask`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({ selected })
    })

    if (!response.ok) {
        throw new Error('Failed to remove task.')
    }

    return response.json();
}