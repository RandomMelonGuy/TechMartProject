from sqlmodel import SQLModel, Field
from pydantic import BaseModel
from typing import Optional

class Profile(SQLModel, table=True):
    #id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", primary_key=True)
    username: str
    ico: str | None = Field(default=None) # filepath
    desc: Optional[str]

class IDRequest(BaseModel):
    id: int

class UpdateProfile(BaseModel):
    username: str
    desc: str
    id: int