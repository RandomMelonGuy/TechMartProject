from fastapi import APIRouter
from .types import RegisterData
from core.types import User, APIResponce
from .service import RegisterDB
from sqlite3 import IntegrityError

router = APIRouter()
db = RegisterDB()


@router.post("/")
def register(data: RegisterData):
    try:
        user = db.to_user(data)
        resData = db.create_user(user)
        responce: APIResponce = APIResponce(status="success", data=resData)
        return responce
    except Exception as e:
        responce: APIResponce = APIResponce(status="error", error="DB EXCEPTION: REGISTER")
        return responce


@router.get("/show")
def show():
    data = db.show()
    return data