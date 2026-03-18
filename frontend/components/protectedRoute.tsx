import request from "@/core/api";
import { Roles } from "@/core/types";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function ProtectedRoute({children, allowedRoles = []}){
    const [role, setRole] = useState<Roles>("user");
    const [err, setErr] = useState<boolean>(false);
    const router = useRouter();
    useEffect(() => {
        request("/auth/get_jwt", "get").then(res => {
            if (res.status === "success"){
                setRole(res.data.role);
            }
            else{
                setErr(true);
            }
        }).catch(e => {console.log(e); setErr(true)});
    }, [])

    if (err || !allowedRoles.includes(role)){
        router.push("/")
        return;
    }

    return children;
    
}