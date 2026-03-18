type SuccessResponce = {
    status: "success",
    data: unknown
}

type ErrorResponce = {
    status: "error",
    error: any
}

export type User = {
    id: number,
    username: string,
    email: string,
    role: Roles
}

export type Entity = {
    id?: number,
    entity_type: string,
    name: string,
    description: string,
    meta: string // JSON string
}

export type Roles = "user" | "mentor"

export type Tag = {
    id: number,
    tag: string
}

export type APIResponce = SuccessResponce | ErrorResponce;