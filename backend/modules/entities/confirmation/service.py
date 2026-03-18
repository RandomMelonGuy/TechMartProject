import json
from ..achivements.service import AchivementService
from ..service import EntityService


class ConfirmationService:
    def __init__(self):
        self.ent_service = EntityService()
        self.ach_service = AchivementService()

    def get_pending_achivements(self):
        all_ach = self.ent_service.get_type("achivement")
        pending = []
        for ach in all_ach:
            try:
                meta = json.loads(ach.meta)
                if meta.get("status") == 0:
                    pending.append(ach)
            except (json.JSONDecodeError, TypeError):
                continue
        return pending

    def approve(self, entity_id: int, mentor_id: int):
        entity = self.ent_service.find_entity(entity_id)
        if not entity: return False

        meta = json.loads(entity.meta)
        meta["status"] = 1
        meta["verified_by"] = mentor_id

        entity.meta = json.dumps(meta)
        return self.ent_service.update_entity(entity, entity_id)

    def reject_and_delete(self, entity_id: int):
        return self.ent_service.drop_entity(entity_id)