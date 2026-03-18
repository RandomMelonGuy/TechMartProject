import request from "../../core/api";
import { APIResponce } from "../../core/types";
import { useState } from "react";
import RegisterData from "./types";

// Валидация возвращает объект ошибок
const validate = (data: RegisterData) => {
    // Инициализируем пустой объект без предустановленных ключей
    const errors: Record<string, string> = {}; 
    
    if (!data.password || data.password === '') {
        errors.password = "Пароль не может быть пустым";
    } else if (data.password.length < 6) {
        errors.password = "Пароль должен быть минимум 6 символов";
    }
    
    if (!data.username || data.username === '') {
        errors.username = "Имя пользователя не может быть пустым";
    }
    
    return errors;
};

function useRegister() {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});        // ошибки валидации
    const [serverError, setServerError] = useState<string>(""); // ошибка сервера

    const register = async (data: RegisterData): Promise<APIResponce> => {
        // Очищаем старые ошибки
        setErrors({});
        setServerError("");
        
        // Валидация
        const validationErrors = validate(data);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return { 
                status: "error", 
                error: validationErrors 
            };
        }

        setLoading(true);
        
        try {
            const res = await request("/register/", "post", data);
            
            if (res.status === "error") {
                // Обработка ошибок от сервера
                if (res.error?.includes("already exists")) {
                    setErrors({ username: "Этот username уже зарегистрирован" });
                } else {
                    setServerError(res.error || "Ошибка регистрации");
                }
            }
            
            return res;
            
        } catch (err) {
            const errorMsg = "Ошибка соединения с сервером";
            setServerError(errorMsg);
            return { status: "error", error: errorMsg };
            
        } finally {
            setLoading(false);
        }
    };

    return {
        register,
        loading,
        errors,
        serverError,
        hasErrors: Object.keys(errors).length > 0 || !!serverError
    };
}

export default useRegister;
