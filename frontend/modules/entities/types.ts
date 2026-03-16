import { Entity, APIResponce } from "@/core/types"

export interface EntityFuncs{
    create: (ent: Entity) => Promise<APIResponce>,
    find: (id: number) => Promise<APIResponce>,
    with_type: (type: string) => Promise<APIResponce>,
    drop: (id: number) => Promise<APIResponce>
}
