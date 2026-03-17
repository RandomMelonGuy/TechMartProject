from fastapi import APIRouter
from core.types import APIResponce, Entity
from .service import AchivementService
from .types import AchData, UpdateAch, IDRequest

router = APIRouter()
service = AchivementService()

@router.post("/create")
def create(data: AchData):
    success = service.create_achivement(data)
    if success:
        return APIResponce(status="success")
    return APIResponce(status="error")

@router.post("/update")
def update(data: UpdateAch):
    ach = AchData(org=data.org, name=data.name, desc=data.desc, filepath=data.filepath)
    success = service.update_achivement(ach, data.entity_id)
    if success:
        return APIResponce(status="success")
    return APIResponce(status="error")

@router.post("/get_user_achivements")
def get_ach(data: IDRequest):
    try:
        ach = service.get_user_achivements(data.id)
        return APIResponce(status="success", data=ach)
    except Exception as e:
        print(repr(e))
        return APIResponce(status="error", error="CAN NOT GET ACHIVEMENTS")
    
@router.post("/drop")
def drop(data: IDRequest):
    success = service.drop_achivement(data.id)
    if success:
        return APIResponce(status="success")
    return APIResponce(status="error")