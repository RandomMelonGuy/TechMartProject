from sqlmodel import Session, select
from typing import Optional
from fastapi import HTTPException
from .types import Mentor_User
from core.types import User

class RelationshipService:
    def __init__(self, engine):
        self.engine = engine

    def add_mentor_to_student(self, login: str, student_id: int):
        with Session(self.engine) as session:
            mentor: User = session.exec(select(User).where(User.username == login)).one()
            student: User = session.get(User, student_id)

            if not mentor or not student or mentor.role != "mentor":
                raise HTTPException(status_code=404, detail="Наставник или ученик не найден или же наставник мнимый")

            connection = Mentor_User(mentor_id=mentor.id, user_id=student_id)
            try:
                session.add(connection)
                session.commit()
                return True
            except Exception as e:
                print(repr(e))
                return False

    def get_student_mentors(self, student_id: int):
        try:
            with Session(self.engine) as session:
                stat = select(User).join(Mentor_User, Mentor_User.user_id == student_id).where(User.id == student_id)
                mentors = session.exec(stat).all()
                return mentors
        except:
            return []
            