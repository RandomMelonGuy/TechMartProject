"use client"
import { APIResponce } from "@/core/types";
import AuthData from "./types";
import { useState } from "react";
import request from "@/core/api";

const validate = (data: AuthData): Record<string, string> => {
    const errors: Record<string, string> = {}; 
    
    if (!data.username || data.username.trim() === '') {
        errors.username = "Введите имя пользователя";
    }
    
    if (!data.password || data.password === '') {
        errors.password = "Введите пароль";
    }
    
    return errors;
}

function useAuth() {
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [serverError, setServerError] = useState<string | null>(null);

    const auth = async(data: AuthData): Promise<APIResponce> => {
        setErrors({});
        setServerError(null);

        const validationErrors = validate(data);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return { status: "error", error: "VALIDATION_ERROR" };
        }

        setLoading(true);
        try {
            const res = await request("/auth/", "post", data);
            if (res.status === "error") {
                setServerError(res.error || "Неверный логин или пароль");
            }
            return res;
        } catch (e) {
            setServerError("Ошибка сети");
            return { status: "error", error: "NETWORK_ERROR" };
        } finally {
            setLoading(false);
        }
    }

    return { loading, auth, errors, serverError };
}

export default useAuth;