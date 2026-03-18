import json
from typing import Dict, Any
from sqlmodel import Session
from data.database import engine
from core.types import Entity, User
from modules.entities.service import EntityService
from .types import AchData


class AchivementService:
    def __init__(self):
        self.ent = EntityService()
        self.engine = engine
    
    def check_attachment(self, data: AchData):
        try:
            with Session(self.engine) as session:
                stat = select(User).where(User.id == data.attached_to)
                user = session.exec(stat).one()
                return True
        except Exception as e:
            print(repr(e))
            return False
    

    def check_user_exists(self, user_id: int) -> bool:
        with Session(self.engine) as session:
            user = session.get(User, user_id)
            return True if user else False

    def create_meta(self, data: AchData) -> Dict[str, Any]:
        return {
            "attached_to": data.attached_to,
            "org": data.org,
            "filepath": data.filepath,
            "participants": data.participants,
            "status": data.status,
            "verified_by": data.verified_by
        }

    def create_achivement(self, data: AchData):
        if not self.check_user_exists(data.attached_to):
            return False

        js_meta = self.create_meta(data)
        ent = Entity(
            entity_type="achivement",
            meta=json.dumps(js_meta),
            name=data.name,
            description=data.desc
        )
        return self.ent.create_entity(ent)

    def update_achivement(self, data: AchData, ach_id: int):
        js_meta = self.create_meta(data)
        ent = Entity(
            entity_type="achivement",
            meta=json.dumps(js_meta),
            name=data.name,
            description=data.desc
        )
        return self.ent.update_entity(ent, ach_id)

    def get_user_achivements(self, user_id: int):
        all_ach = self.ent.get_type("achivement")
        user_ach = []
        for item in all_ach:
            try:
                meta_data = json.loads(item.meta)
                if meta_data.get("attached_to") == user_id:
                    user_ach.append(item)
            except:
                continue
        return user_ach

    def drop_achivement(self, ach_id: int):
        return self.ent.drop_entity(ach_id)