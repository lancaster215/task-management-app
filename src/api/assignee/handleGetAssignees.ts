import { BASE_URL } from "@/components/constants/baseURL";

export default async function handleGetAssignees() {
    const response = await fetch(`${BASE_URL}/api/users`, {
        method: "GET",
    })

    if (!response.ok) {
        throw new Error('Failed to get assignees');
    }

    return response.json();
}