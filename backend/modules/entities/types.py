from pydantic import BaseModel
from typing import Optional
from core.types import Entity

class IDRequest(BaseModel):
    id: int

class GetTypeRequest(BaseModel):
    type: str

class UpdateEntity(Entity):
    entity_id: int