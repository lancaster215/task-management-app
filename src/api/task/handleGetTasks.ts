import { api } from "@/lib/interceptor";

export default async function handleGetTasks({ userId }: { userId: string }) {
    try {
        const tasksResponse = await api(`/api/task`, {
            method: 'POST',
            credentials: "include",
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