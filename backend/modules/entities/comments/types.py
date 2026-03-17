from pydantic import BaseModel

class CommentCreate(BaseModel):
    target_id: int    # ID того, что комментируем
    author_id: int    # ID того, кто пишет
    text: str         # Текст

class CommentIDRequest(BaseModel):
    id: int