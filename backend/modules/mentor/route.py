from fastapi import APIRouter, Depends
from core.types import APIResponce
from .service import RelationshipService
from .types import IDRequest, RelationCreate
from data.database import engine

router = APIRouter()
service = RelationshipService(engine)
def get_rel_service():
    return RelationshipService(engine)

@router.post("/assign-mentor")
def assign_mentor( data: RelationCreate):
    success =  service.add_mentor_to_student(data.login, data.user_id)
    if success:
        return APIResponce(status="success")
    return APIResponce(status="error", error="")

@router.post('/get_users')
def get_users_mentors(req: IDRequest):
    mentors = service.get_student_mentors(req.id)
    if mentors:
        return APIResponce(status="success", data=mentors)
    return APIResponce(status="error", error="CAN NOT FETCH MENTORS")
    