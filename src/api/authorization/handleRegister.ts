import { BASE_URL } from "@/constants/baseURL";
import { RegisterFormData } from "@/components/register";

export const handleRegister = async (formData: RegisterFormData) => {
    const payload = {
        username: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
    };

    const response = await fetch(`${BASE_URL}/api/register`, {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(payload),
    });

    const jsonRes = response.json()

    if (!response.ok) {
        const errorRes = await jsonRes
        throw new Error(errorRes.error);
    }

    return jsonRes;
};