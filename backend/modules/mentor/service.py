from sqlmodel import Session, select
from typing import Optional
from fastapi import HTTPException
from .types import Mentor_User
from core.types import User
import datetime
from modules.entities.gamification.service import GamificationService

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
                stat = (
                    select(User)
                    .join(Mentor_User, Mentor_User.mentor_id == User.id)  # ← правильно!
                    .where(Mentor_User.user_id == student_id)              # ← фильтр по ученику
                )
                mentors = session.exec(stat).all()
                return mentors
        except Exception as e:
            print(repr(e))
            return []


    def get_mentors_students(self, mentor_id: int):
        """Получить всех учеников, закреплённых за наставником"""
        try:
            with Session(self.engine) as session:
                statement = (
                    select(User)
                    .join(Mentor_User, Mentor_User.user_id == User.id)  # связываем учеников
                    .where(Mentor_User.mentor_id == mentor_id)          # фильтр по наставнику
                )
                students = session.exec(statement).all()
                return students
        except Exception as e:
            print(f"Error getting mentor's students: {repr(e)}")
            return []
    
    def get_rating(self, mentor_id: int):
        """
        Возвращает рейтинг всех учеников, закреплённых за наставником.
        Сортировка по убыванию XP (от лучших к худшим)
        """
        try:
            with Session(self.engine) as session:
                # 1. Получаем всех учеников наставника
                students = (
                    select(User)
                    .join(Mentor_User, Mentor_User.user_id == User.id)
                    .where(Mentor_User.mentor_id == mentor_id)
                )
                students_list = session.exec(students).all()
                
                if not students_list:
                    return []
                
                # 2. Для каждого ученика получаем статистику
                gamification_service = GamificationService()
                rating_data = []
                
                for student in students_list:
                    stats = gamification_service.get_user_stats(student.id)
                    if stats:
                        rating_data.append({
                            "user_id": student.id,
                            "username": student.username,
                            "total_xp": stats["total_xp"],
                            "level": stats["level"],
                            "confirmed_count": stats["confirmed_count"],
                            "badges": stats["badges"]
                        })
                
                # 3. Сортируем по XP (от большего к меньшему)
                rating_data.sort(key=lambda x: x["total_xp"], reverse=True)
                
                # 4. Добавляем место в рейтинге
                for idx, item in enumerate(rating_data, 1):
                    item["place"] = idx
                
                return rating_data
                
        except Exception as e:
            print(f"Error getting rating: {repr(e)}")
            return []