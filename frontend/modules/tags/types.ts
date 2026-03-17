import { APIResponce } from "@/core/types"

export type Tag = {
    id?: number,
    tag: string
}
export type Tag_Entity = {
    id: number,
    entity_id: number,
    tag_id: number
}

export interface TagFunctions{
    create: (tag: string) => Promise<APIResponce>;
    attach: (entity_id: number, tag_id: number) => Promise<APIResponce>;
    detach: (entity_id: number, tag_id: number) => Promise<APIResponce>;
    get_with: (tag: string) => Promise<APIResponce>;
    get_entity_tags: (id: number) => Promise<APIResponce>;
}