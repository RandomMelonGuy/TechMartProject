from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    JWTKEY: str = "SOMEIMPORTANTKEYTHATSHOULDNOTBELEAKED"
    DEBUG: bool = True

settings = Settings()