from fastapi import APIRouter
from .service import TagService
from core.types import APIResponce
router = APIRouter()
service = TagService()

@router.get("/get")
def get_tags():
    tags = service.get_tags()
    if tags:
        return APIResponce(status="success", data=tags)
    return APIResponce(status="error")


@router.get("/create")
def create_tag(tag: str):
    success = service.create_tag(tag)
    if success:
        return APIResponce(status="success")
    return APIResponce(status="error")


@router.get("/attach")
def attach_tag(entity_id: int, tag_id: int):
    success = service.attach(entity_id, tag_id)
    if success:
        return APIResponce(status="success")
    return APIResponce(status="error")



@router.post("/get_with")
def get_with_tag(tag: str):
    entities = service.with_tag(tag)
    if entities:
        return APIResponce(status="success", data=entities)
    return APIResponce(status="error")


@router.post("/get_entity_tags")
def get_entity_tags(entity_id: int):
    tags = service.get_entity_tags(entity_id)
    return tags