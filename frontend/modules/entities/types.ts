import { Entity, APIResponce } from "@/core/types"

export interface EntityFuncs{
    create: (ent: Entity) => APIResponce,
    find: (id: number) => APIResponce,
    get_type: (type: string) => APIResponce,
    drop: (id: number) => APIResponce
}
