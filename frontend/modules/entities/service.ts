import request from "@/core/api";
import { APIResponce, Entity } from "@/core/types";
import { useState, useEffect } from "react";
import { EntityFuncs } from "./types";

const validate = (req: Entity): boolean => {
    if (req.name !== "" && req.entity_type !== ""){
        return true;
    }
    return false;
}

const useEntity = (req: Entity): EntityFuncs => {
    const [entity, useEntity] = useState<Entity>({} as Entity);
    
}