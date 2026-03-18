from fastapi import APIRouter
from core.types import APIResponce
from .service import ConfirmationService
from pydantic import BaseModel

router = APIRouter()
service = ConfirmationService()

class ConfirmRequest(BaseModel):
    mentor_id: int

@router.get("/pending")
def get_pending():
    data = service.get_pending_achivements()
    return APIResponce(status="success", data=data)

@router.post("/approve/{entity_id}")
def approve(entity_id: int, req: ConfirmRequest):
    success = service.approve(entity_id, req.mentor_id)
    if success:
        return APIResponce(status="success", data="Achievement approved")
    return APIResponce(status="error", data="Not found")

@router.post("/reject/{entity_id}")
def reject(entity_id: int):
    success = service.reject_and_delete(entity_id)
    if success:
        return APIResponce(status="success", data="Achievement deleted")
    return APIResponce(status="error", data="Delete failed")