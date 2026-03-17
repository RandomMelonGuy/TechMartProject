from fastapi import APIRouter, Depends
from .service import RelationshipService
from data.database import engine

router = APIRouter()

def get_rel_service():
    return RelationshipService(engine)

@router.post("/assign-mentor")
def assign_mentor(
    mentor_id: int,
    student_id: int,
    service: RelationshipService = Depends(get_rel_service)
):
    return service.add_mentor_to_student(mentor_id, student_id)