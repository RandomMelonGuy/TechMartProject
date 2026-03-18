from fastapi import APIRouter, HTTPException, Response, Request, Depends
from .service import AuthService
from .types import AuthData
from core.types import APIResponce
from typing import Dict, Any
from core.security import verify_user

router = APIRouter()
service = AuthService()


@router.post("/")
def auth(data: AuthData, responce: Response) -> APIResponce:
    try:
        jwt = service.auth_request(data)
        responce.set_cookie(key="session", value=jwt, secure=False, samesite="lax")
        return APIResponce(status="success")
    except Exception as e:
        return APIResponce(status="error", error=repr(e))


@router.get("/get_jwt")
def get_jwt(req: Request, user: Dict[str, Any] = Depends(verify_user)):
    return user