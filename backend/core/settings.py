from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    jwtKey: str = "SOMEIMPORTANTKEYTHATSHOULDNOTBELEAKED"

settings = Settings()