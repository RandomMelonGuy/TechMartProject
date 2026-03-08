from core.types import User
from sqlmodel import Session, select
from data.database import engine
from .types import RegisterData
from passlib.hash import pbkdf2_sha256

class RegisterDB:
    def __init__(self):
        self.engine = engine
    
    def to_user(self, data: RegisterData):
        password = pbkdf2_sha256.hash(data.password)
        return User(username=data.username, password=password, email=data.email)

    def create_user(self, data: User):
        with Session(self.engine) as session:
            session.add(data)
            session.commit()
            password = pbkdf2_sha256.hash(data.password)
            responce = {"username": data.username, "password": password, "email": data.email}

        return responce
    
    def show(self):
        with Session(self.engine) as session:
            statement = select(User)
            data = session.exec(statement).all()
        
        return data
