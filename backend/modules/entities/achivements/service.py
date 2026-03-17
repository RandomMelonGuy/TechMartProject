from core.types import Entity, User
from .types import AchData, UpdateAch
from ..service import EntityService
from data.database import engine
from typing import Dict, Any
import json

class AchivementService:
    def __init__(self):
        self.ent = EntityService()
        self.engine = engine
    
    def check_attachment(self, data: AchData):
        entity = self.ent.find_entity(data.attached_to)
        if entity:
            return True
        return False
    
    def create_meta(self, data: AchData) -> Dict[str, Any]:
        return {"attached_to": data.attached_to, "org": data.org, "filepath": data.filepath}

    def create_achivement(self, data: AchData):
        if not self.check_attachment(data): return False
        js_meta = self.create_meta(data)
        meta = json.dumps(js_meta)
        ent = Entity(**{"entity_type": "achivement", "meta": meta, "name": data.name, "description": data.desc})
        success = self.ent.create_entity(ent)
        return success
    
    def update_achivement(self, data: AchData, ach_id: int):
        js_meta = self.create_meta(data)
        meta = json.dumps(js_meta)
        ent = Entity(**{"entity_type": "achivement", "meta": meta, "name": data.name, "description": data.desc})
        success = self.ent.update_entity(ent, ach_id)
        if success:
            return True
        return False

    def get_user_achivements(self, user_id: int):
        ach = self.ent.get_type("achivement")
        print(ach)
        ach = [i for i in ach if json.loads(i.meta).get("attached_to") == user_id]
        return ach

    def drop_achivement(self, id: int):
        ach = self.ent.drop_entity(id)
        if ach:
            return True
        return False
