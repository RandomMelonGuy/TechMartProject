from fastapi import FastAPI
from modules.register.route import router as registerRouter
from modules.auth.route import router as authRouter
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
server.include_router(registerRouter, prefix="/register")
server.include_router(authRouter, prefix='/auth')