from sqlmodel import SQLModel, Field, UniqueConstraint
from pydantic import BaseModel

class Mentor_User(SQLModel, table=True):
    __table_args__ = (
        UniqueConstraint("user_id", "mentor_id"),
    )
    id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="user.id")
    mentor_id: int | None = Field(default=None, foreign_key="user.id")

class IDRequest(BaseModel):
    id: int
    
class RelationCreate(BaseModel):
    login: str
    user_id: int