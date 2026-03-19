import { APIResponce } from "./types";

async function request(url: string, method: "get" | "post", data?: {}, headers?: HeadersInit): Promise<APIResponce> {
    const fullUrl = `http://127.0.0.1:8000${url}`;

    try {
        const options: RequestInit = {
            method: method.toUpperCase(),
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            credentials: "include"
        };

        if (method === "post" && data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(fullUrl, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (e) {
        console.error("API Request Error:", e);
        return { status: "error", error: "CONNECTION_LOST" };
    }
}

export const getUserGraph = async (userId: number) => {
    return await request(`/profiles/graph/${userId}`, "get");
};

export default request;