from fastapi import APIRouter, Depends, Request
from core.types import APIResponce
from .types import IDRequest, UpdateProfile
from typing import Dict, Any
from core.security import verify_user
from .service import ProfileService

router = APIRouter()
service = ProfileService()

@router.get("/me")
def self_profile(req: Request, user: Dict[str, Any] = Depends(verify_user)):
    user_id = user["id"]
    profile = service.get_profile(user_id)
    if profile:
        return APIResponce(status="success", data=profile)
    return APIResponce(status="error", error="CAN NOT GET PROFILE")

@router.get("/get/{user_id}")
def get_profile(user_id: int):
    profile = service.get_profile(user_id)
    if profile:
        return APIResponce(status="success", data=profile)
    return APIResponce(status="error", error="CAN NOT GET PROFILE")

@router.post("/update")
def update(req: UpdateProfile):
    success = service.update_profile(req)
    if success:
        return APIResponce(status="success")
    return APIResponce(status="error")