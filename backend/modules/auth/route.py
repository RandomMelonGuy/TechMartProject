from fastapi import APIRouter, HTTPException, Response, Request, Depends
from .service import AuthService
from .types import AuthData
from core.types import User
from core.types import APIResponce
from typing import Dict, Any
from core.settings import settings
from core.security import verify_user
from sqlmodel import Session
from data.database import engine
import jwt

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

# modules/auth/routes.py
from pydantic import BaseModel

class TokenRequest(BaseModel):
    token: str

@router.post("/verify")
def verify_token(request: TokenRequest):
    try:
        payload = jwt.decode(
            request.token, 
            settings.JWTKEY, 
            ["HS256"], 
            leeway=4
        )
        return {
            "valid": True,
            "user": {
                "id": payload["id"],
                "role": payload["role"],
                "username": payload["username"]
            }
        }
    except:
        return {"valid": False}

@router.get("/{user_id}")
def get_public_user(user_id: int):
    with Session(engine) as session:
        user = session.get(User, user_id)
        print(user)
        if not user:
            return {"error": "User not found"}
        
        return {
            "user": {
                "id": user.id,
                "username": user.username,
                "role": user.role
            }
        }