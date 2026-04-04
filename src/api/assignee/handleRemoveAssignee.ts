import { BASE_URL } from "@/components/constants/baseURL";

export default async function handleRemoveAssignee(selected: string) {
    const response = await fetch(`${BASE_URL}/api/removeUser`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({ selected }) //array
    })

    if (!response.ok) {
        throw new Error('Failed to remove assignee');
    }
    return response.json();
}