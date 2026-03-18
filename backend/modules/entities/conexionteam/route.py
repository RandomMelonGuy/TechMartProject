from fastapi import APIRouter
from core.types import APIResponce
from .service import GraphService
from .types import GraphRequest

router = APIRouter()
service = GraphService()

@router.post("/get_map")
def get_map(data: GraphRequest):
    result = service.build_collaboration_map(data.user_id)
    return APIResponce(status="success", data=result)