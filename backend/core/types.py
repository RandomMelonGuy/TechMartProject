from sqlmodel import SQLModel, Field
from pydantic import BaseModel
from typing import Dict, Literal, Any, Optional

class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(unique=True)
    password: str
    email: str


class Entity(SQLModel, table=True):
    id: int
    entity_type: str # Любое название по типу: team, company, order и т.п
    name: str
    description: str | None = None
    metadata: str | None = None # JSON string


class APIResponce(BaseModel):
    status: Literal["success", "error"]
    error: Optional[Any] = ""
    data: Optional[Dict[str, Any]] = {}