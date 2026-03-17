from fastapi import APIRouter
from core.types import APIResponce
from .service import CommentService
from .types import CommentCreate, CommentIDRequest

router = APIRouter()
service = CommentService()

@router.post("/add")
def add(data: CommentCreate):
    if service.add_comment(data):
        return APIResponce(status="success")
    return APIResponce(status="error")

@router.post("/get_for_target")
def get_comments(data: CommentIDRequest):
    comments = service.get_comments_for_target(data.id)
    return APIResponce(status="success", data=comments)