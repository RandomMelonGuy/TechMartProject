from sqlmodel import Session, select
from typing import Optional, List
from core.types import User

class SearchService:
    def __init__(self, engine):
        self.engine = engine

    def get_user_by_id(self, user_id: int) -> Optional[User]:
        with Session(self.engine) as session:
            return session.get(User, user_id)

    def get_user_by_username(self, username: str) -> Optional[User]:
        with Session(self.engine) as session:
            statement = select(User).where(User.username == username)
            return session.exac(statement).first()