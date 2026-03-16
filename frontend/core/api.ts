import { APIResponce } from "./types";

async function request(url: string, method: "get" | "post", data?: {}): Promise<APIResponce>{
    const fullUrl = `http://127.0.0.1:8000${url}`;
    console.log(fullUrl);
    if (method === "get"){
        const res: Promise<APIResponce> = (await fetch(fullUrl)).json();
        return res;
    }
    else{
        const res: Promise<APIResponce> = (await fetch(fullUrl, {credentials: "include",method: "POST", body: JSON.stringify(data), headers: {'Content-Type': "application/json"}})).json();
        console.log(res);
        return res;
    }
}

export default request;