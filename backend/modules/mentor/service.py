from sqlmodel import Session, select
from typing import Optional
from fastapi import HTTPException
from core.types import User

class RelationshipService:
    def __init__(self, engine):
        self.engine = engine

    def add_mentor_to_student(self, mentor_id: int, student_id: int):
        with Session(self.engine) as session:
            mentor = session.get(User, mentor_id)
            student = session.get(User, student_id)

            if not mentor or not student or mentor.role != "mentor":
                raise HTTPException(status_code=404, detail="Наставник или ученик не найден или же наставник мнимый")

            if mentor not in student.mentors:
                student.mentors.append(mentor)
                session.add(student)
                session.commit()
                return {"status": "success", "message": f"{mentor.name} теперь наставник {student.name}"}

            return {"status": "already_exists"}

    def get_student_mentors(self, student_id: int):
        with Session(self.engine) as session:
            student = session.get(User, student_id)
            return student.mentors if student else []