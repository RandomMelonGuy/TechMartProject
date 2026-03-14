from fastapi import FastAPI
from sqlmodel import SQLModel

from modules.register.route import router as registerRouter
from modules.auth.route import router as authRouter
from modules.entities.route import router as entityRouter
from modules.tags.route import router as tagRouter
from modules.debug.route import router as debugRouter
from core.settings import settings

from contextlib import asynccontextmanager
from data.database import engine

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("START")
    yield
    print("CLOSE REQUEST")
    engine.dispose()
    print("CLOSED")



server = FastAPI(lifespan=lifespan)
server.include_router(registerRouter, prefix="/register", tags=["Регистрация"])
server.include_router(authRouter, prefix='/auth', tags=["Авторизация"])
server.include_router(entityRouter, prefix="/entity", tags=["Сущности"])
server.include_router(tagRouter, prefix="/tag", tags=["Теги"])

if settings.DEBUG:
    server.include_router(debugRouter, prefix="/debug", tags=["Дебаг"])

SQLModel.metadata.create_all(engine)