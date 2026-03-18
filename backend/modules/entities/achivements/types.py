from core.types import User
from sqlmodel import SQLModel, Field, UniqueConstraint
from pydantic import BaseModel
from typing import List

"""class User_Achivement(SQLModel, table=True):
    __table_args__ = (
        UniqueConstraint("user_id", "ach_id", name="UNIQUE_PAIRS"),
    )
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", ondelete="CASCADE")
    ach_id: int = Field(foreign_key="entity.id", ondelete="CASCADE")"""

class AchData(BaseModel):
    attached_to: int
    name: str
    desc: str
    filepath: str # Путь до файла
    org: str
    participants: List[int] = []

class UpdateAch(AchData):
    entity_id: int

class IDRequest(BaseModel):
    id: int