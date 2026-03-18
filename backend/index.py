from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from sqlmodel import SQLModel


from modules.register.route import router as registerRouter
from modules.auth.route import router as authRouter
from modules.entities.route import router as entityRouter
from modules.tags.route import router as tagRouter
from modules.debug.route import router as debugRouter
from modules.profiles.route import router as profileRouter
from modules.entities.achivements.route import router as AchRouter
from core.image_to_folder import router as IMGRouter
from modules.mentor.route import router as mentorRouter
from modules.search.route import router as SearchRouter
from modules.entities.comments.route import router as commentRouter
from modules.entities.conexionteam.route import router as graphRouter
from modules.AI.route import router as AIRouter
from core.settings import settings

from contextlib import asynccontextmanager
from data.database import engine
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://127.0.0.1:3000"
]


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("START")
    yield
    print("CLOSE REQUEST")
    engine.dispose()
    print("CLOSED")



server = FastAPI(lifespan=lifespan)

server.mount("/static", StaticFiles(directory="static"), name='static')

server.add_middleware(CORSMiddleware, allow_origins=origins,allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

server.include_router(registerRouter, prefix="/register", tags=["Регистрация"])
server.include_router(authRouter, prefix='/auth', tags=["Авторизация"])
server.include_router(entityRouter, prefix="/entity", tags=["Сущности"])
server.include_router(tagRouter, prefix="/tag", tags=["Теги"])
server.include_router(profileRouter, prefix="/profile", tags=["Профили"])
server.include_router(AchRouter, prefix="/achivement", tags=["Грамоты"])
server.include_router(IMGRouter, prefix="/img", tags=["Изображения"])
server.include_router(mentorRouter, prefix="/relationships", tags=["Отношения"])
server.include_router(SearchRouter, prefix="/search", tags=["Поиск"])
server.include_router(commentRouter, prefix="/comments", tags=["Коментарии"])
server.include_router(graphRouter, prefix="/graph", tags=["Графы"])
server.include_router(AIRouter, prefix="/autoAICompletion", tags=["Автозаполнение"])
if settings.DEBUG:
    server.include_router(debugRouter, prefix="/debug", tags=["Дебаг"])

SQLModel.metadata.create_all(engine)