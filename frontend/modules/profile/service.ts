import { Profile, ProfileForm } from "./types";
import {useState, useEffect} from "react";
import { APIResponce } from "@/core/types";
import request from "@/core/api";

const useProfile = (user_id?: number): [Profile, (data: ProfileForm) => Promise<APIResponce>] => {
    const [profile, setProfile] = useState<Profile>({id: 0, desc: "", username: "", user_id: 0});
    useEffect(() => {
        if (user_id != undefined){
            request("/profile/get/", "post", { user_id }).then(data => {
                if (data.status === "success"){
                    setProfile(data.data as Profile);
                }
                else{
                    console.log(data.error)
                }
            })
        }
        else{
            request("/profile/me", "get").then(data => {
                if (data.status === "success"){
                    setProfile(data.data as Profile);
                }
                else{
                    console.log(data.error)
                }
            })
        }
    }, [user_id])
    
    const updateProfile = async(data: ProfileForm): Promise<APIResponce> => {
        const res = await request("/profile/update/", "post", data);
        return res;
    }

    return [profile, updateProfile]
}

export default useProfile