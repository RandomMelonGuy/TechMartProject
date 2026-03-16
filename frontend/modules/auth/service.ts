import { APIResponce } from "@/core/types";
import AuthData from "./types";
import { useState, useEffect } from "react";
import request from "@/core/api";

const validate = (data: AuthData): boolean => {
    if (data.password !== "" && data.username !== ""){
        return true;
    }
    return false;
}

function useAuth(): [boolean, (req: AuthData) => Promise<APIResponce>] {
    const [loading, setLoading] = useState<boolean>(false);

    const auth = async(data: AuthData): Promise<APIResponce> =>{
        if (!validate(data)) return Promise.resolve({status: "error", error: "VERIFICATION ERROR"});
        setLoading(true);
        const res = await request("/auth/", "post", data);
        setLoading(false);
        return res;
    }

    return [loading, auth]
}

export default useAuth;