from pydantic import BaseModel
from typing import List, Optional

class AchData(BaseModel):
    attached_to: int
    name: str
    desc: str
    filepath: str
    org: str
    participants: List[int] = []
    status: int = 0  # 0: pending, 1: approved
    verified_by: Optional[int] = None

class UpdateAch(AchData):
    entity_id: int

class IDRequest(BaseModel):
    id: int