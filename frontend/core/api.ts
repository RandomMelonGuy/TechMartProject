import { APIResponce } from "./types";

async function request(url: string, method: "get" | "post", data?: {}, headers?: HeadersInit): Promise<APIResponce>{
    const fullUrl = `http://127.0.0.1:8000${url}`;
    console.log(fullUrl);
    try{
        if (method === "get"){
            const res: Promise<APIResponce> = (await fetch(fullUrl, {headers: {...headers}})).json();
            return res;
        }
        else{
            const res: Promise<APIResponce> = (await fetch(fullUrl, {credentials: "include",method: "POST", body: JSON.stringify(data), headers: {'Content-Type':  "application/json", ...headers}})).json();
            return res;
        }
    }
    catch(e){
        console.log(e);
        return Promise.resolve({status: "error", error: "CONNECTION LOST"})
    }
}

export default request;