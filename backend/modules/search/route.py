from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional
from .service import SearchService
from data.database import engine

router = APIRouter()

def get_search_service():
    return SearchService(engine)

@router.get("/user")
def search_user(
        user_id: Optional[int] = Query(None, description="Поиск по ID"),
        username: Optional[str] = Query(None, description="Поиск по username"),
        service: SearchService = Depends(get_search_service)
):
    if user_id is not None:
        user = service.get_user_by_id(user_id)

    elif username is not None:
        user = service.get_user_by_username(username)

    else:
        raise HTTPException(status_code=400, detail="Вы не указали ни ID, ни username для поиска")

    if not user:
        raise HTTPException(status_code=404, detail="Пользователь с такими данными не зарегистрирован")
    return user
