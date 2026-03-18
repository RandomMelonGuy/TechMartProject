import json
from ..service import EntityService

class GraphService:
    def __init__(self):
        self.ent = EntityService()

    def build_collaboration_map(self, user_id: int):
        all_entities = self.ent.get_type("achivement")

        nodes = []
        edges = []
        nodes.append({"id": f"u_{user_id}", "label": "Вы", "color": "#ff0000"})

        added_nodes = {f"u_{user_id}"}

        for item in all_entities:
            meta = json.loads(item.meta)
            participants = meta.get("participants", [])

            if user_id in participants:
                project_id = f"p_{item.id}"

                if project_id not in added_nodes:
                    nodes.append({"id": project_id, "label": item.name, "type": "project"})
                    added_nodes.add(project_id)

                # Рисуем ветку: Юзер -> Проект
                edges.append({"from": f"u_{user_id}", "to": project_id})

                for p_id in participants:
                    if p_id != user_id:
                        peer_id = f"u_{p_id}"
                        if peer_id not in added_nodes:
                            nodes.append({"id": peer_id, "label": f"ID {p_id}", "type": "user"})
                            added_nodes.add(peer_id)

                        edges.append({"from": project_id, "to": peer_id})

        return {"nodes": nodes, "edges": edges}