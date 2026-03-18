from sqlmodel import Session, select
from data.database import engine
from .types import Profile, UpdateProfile

class ProfileService:
    def __init__(self):
        self.engine = engine
    
    def get_profile(self, user_id: int):
        try:
            with Session(self.engine) as session:
                stat = select(Profile).where(Profile.user_id == user_id)
                profile = session.exec(stat).one()
            
            return profile
        except Exception as e:
            print(repr(e))
            return None
    
    def update_profile(self, req: UpdateProfile):
        try:
            with Session(self.engine) as session:
                stat = select(Profile).where(Profile.user_id == req.id)
                profile = session.exec(stat).one()
                profile.username = req.username
                profile.desc = req.desc
                session.add(profile)
                session.commit()
            return True
        except Exception as e:
            print(repr(e))
            return False
