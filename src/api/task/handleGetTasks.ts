import { BASE_URL } from "@/constants/baseURL";
import { api } from "@/lib/interceptor";

export default async function handleGetTasks({ userId }: { userId: string }) {
    console.log(userId, 'userId')
    try {
        const tasksResponse = await api(`/api/task`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: userId
            })
        })

        if (!tasksResponse.ok) {
            throw new Error(`HTTP error! status: ${tasksResponse.status}`);
        }

        const tasks = await tasksResponse.json();

        return tasks || [];
    } catch (err) {
        console.error(`Error in getting tasks: ${err}`)
    }
}