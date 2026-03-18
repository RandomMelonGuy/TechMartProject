from fastapi import APIRouter
from core.types import APIResponce
from .service import AchivementService
from .types import AchData, UpdateAch

router = APIRouter()
service = AchivementService()

@router.post("/create")
def create(data: AchData):
    success = service.create_achivement(data)
    if success:
        return APIResponce(status="success", data={"message": "Created"})
    return APIResponce(status="error", error="User not found or DB error")

@router.post("/update")
def update(data: UpdateAch):
    # Передаем data (как AchData) и отдельно id
    success = service.update_achivement(data, data.entity_id)
    if success:
        return APIResponce(status="success", data={"message": "Updated"})
    return APIResponce(status="error", error="Update failed")

@router.get("/get/{user_id}")
def get_user_ach(user_id: int):
    data = service.get_user_achivements(user_id)
    return APIResponce(status="success", data=data)

@router.delete("/delete/{ach_id}")
def delete_ach(ach_id: int):
    if service.drop_achivement(ach_id):
        return APIResponce(status="success")
    return APIResponce(status="error")