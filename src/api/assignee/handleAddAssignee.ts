import { BASE_URL } from "@/components/constants/baseURL";
import { AssigneeFormData } from "@/components/modal/AddNewAssigneeModal";

export const handleAddAssignee = async (formData: AssigneeFormData) => {
    const payload = {
        id: formData.id,
        name: formData.name,
    };

    const response = await fetch(`${BASE_URL}/api/addUser`, {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Failed to add assignee');
    }

    return response.json();
};