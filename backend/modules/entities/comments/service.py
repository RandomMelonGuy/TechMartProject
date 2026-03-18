import json
from ..service import EntityService
from core.types import Entity
from .types import CommentCreate


class CommentService:
    def __init__(self):
        self.ent = EntityService()

    def add_comment(self, data: CommentCreate):
        meta = json.dumps({
            "attached_to": data.target_id,
            "author_id": data.author_id
        })

        new_ent = Entity(
            entity_type="comment",
            name=f"Comment_by_{data.author_id}",
            description=data.text,
            meta=meta
        )
        return self.ent.create_entity(new_ent)

    def get_comments_for_target(self, target_id: int):
        all_comments = self.ent.get_type("comment")
        result = []
        for c in all_comments:
            meta = json.loads(c.meta)
            if meta.get("attached_to") == target_id:
                result.append(c)
        return result