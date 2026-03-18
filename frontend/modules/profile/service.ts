"use client"
import { Profile, ProfileForm } from "./types";
import {useState, useEffect} from "react";
import { APIResponce } from "@/core/types";
import request from "@/core/api";

const useProfile = (user_id?: number): [Profile, (data: ProfileForm) => Promise<APIResponce>] => {
    const [profile, setProfile] = useState<Profile>({ desc: "", username: "", user_id: 1, ico: "" });

    useEffect(() => {
        const fetchProfile = async () => {
            // Выбираем конфиг запроса в зависимости от наличия ID
            const url = user_id !== undefined ? "/profile/get/" : "/profile/me";
            const method = user_id !== undefined ? "post" : "get";
            const body = user_id !== undefined ? { user_id } : undefined;

            try {
                const data = await request(url, method, body);
                if (data.status === "success") {
                    setProfile(data.data as Profile);
                } else {
                    console.error("Fetch error:", data.error);
                }
            } catch (err) {
                console.error("Network error:", err);
            }
        };

        fetchProfile();
    }, [user_id]); // Перезапускать, только если сменился ID

    const updateProfile = async (data: ProfileForm): Promise<APIResponce> => {
        const res = await request("/profile/update/", "post", data);
        
        // КРИТИЧЕСКОЕ ИЗМЕНЕНИЕ: 
        // Если обновление на сервере прошло успешно, обновляем стейт локально
        if (res.status === "success") {
            setProfile(prev => ({
                ...prev,
                ...data, // Мержим новые данные (username, desc и т.д.)
            }));
        }
        
        return res;
    };

    return [profile, updateProfile];
}

export default useProfile;