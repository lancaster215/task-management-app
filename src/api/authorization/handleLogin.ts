import { LoginFormData } from "@/components/login";

export const handleLogin = async (formData: LoginFormData) => {
    const payload = {
        username: formData.username,
        password: formData.password,
    };

    const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Error in logging in');
    }

    return response.json();
};