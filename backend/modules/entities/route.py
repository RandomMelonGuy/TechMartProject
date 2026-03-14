from fastapi import APIRouter
from core.types import APIResponce, Entity
from .service import EntityService
from json import loads

router = APIRouter()
service = EntityService()

@router.post("/create")
def create_entity(data: Entity):
    success = service.create_entity(data)
    if success:
        return APIResponce(status="success")
    return APIResponce(status="error")


@router.post("/find")
def find_entity(id: int):
    entity = service.find_entity(id)
    if entity:
        json = loads(entity.model_dump_json())
        return APIResponce(status="success", data=json)
    return APIResponce(status="error")


@router.post("/get_type")
def get_type(type: str):
    entities = service.get_type(type)
    if entities:
        return APIResponce(status="success", data=entities)
    return APIResponce(status="error")


@router.post("/drop_entity")
def drop(id: int):
    success = service.drop_entity(id)
    if success:
        return APIResponce(status="success")
    return APIResponce(status="error")


