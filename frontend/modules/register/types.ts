import { Roles } from "@/core/types";
export type RegisterData = {
    username: string,
    email: string,
    password: string,
    role: Roles
}

export default RegisterData;