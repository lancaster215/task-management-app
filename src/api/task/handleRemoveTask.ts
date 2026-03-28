import { BASE_URL } from "@/components/constants/baseURL";

export default async function handleRemoveTask(selected: readonly number[]) {
    const response = await fetch(`${BASE_URL}/api/removeTask`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({ selected }) //array
    })

    if (!response.ok) {
        throw new Error('Failed to remove task.')
    }

    return response.json();
}