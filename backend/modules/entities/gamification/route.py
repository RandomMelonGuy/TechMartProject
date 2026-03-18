from fastapi import APIRouter
from core.types import APIResponce
from .service import GamificationService

router = APIRouter()
service = GamificationService()

@router.get("/stats/{user_id}")
def get_gamification_data(user_id: int):
    data = service.get_user_stats(user_id)
    if data:
        return APIResponce(status="success", data=data)
    return APIResponce(status="error", error="DATA_NOT_FOUND")