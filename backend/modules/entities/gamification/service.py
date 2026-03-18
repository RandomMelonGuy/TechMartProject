import json
from modules.entities.service import EntityService
from .badges_config import BADGES_COLLECTION


class GamificationService:
    def __init__(self):
        self.ent_service = EntityService()
        self.BASE_XP_PER_ACH = 100

    def get_user_stats(self, user_id: int):
        all_ach = self.ent_service.get_type("achivement")
        confirmed_count = 0

        for ach in all_ach:
            try:
                meta = json.loads(ach.meta)
                if meta.get("attached_to") == user_id and meta.get("status") == 1:
                    confirmed_count += 1
            except:
                continue

        total_xp = confirmed_count * self.BASE_XP_PER_ACH

        unlocked_badges = []
        for milestone in sorted(BADGES_COLLECTION.keys()):
            if confirmed_count >= milestone:
                badge = BADGES_COLLECTION[milestone]
                total_xp += badge["bonus"]

                unlocked_badges.append({
                    "id": f"badge_{milestone}",
                    "name": badge["name"],
                    "icon": badge["icon"],
                    "milestone": milestone,
                    "bonus_xp": badge["bonus"]
                })
            else:
                break

        return {
            "user_id": user_id,
            "total_xp": total_xp,
            "level": (total_xp // 500) + 1,
            "confirmed_count": confirmed_count,
            "badges": unlocked_badges
        }