from sqlmodel import SQLModel, Field, Relationship, UniqueConstraint

class Tag(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    tag: str = Field(unique=True)

class Tag_Entity(SQLModel, table=True):
    __table_args__ = (
        UniqueConstraint("entity_id", "tag_id", name="UNIQUE_PAIRS"),
    )
    id: int | None = Field(default=None, primary_key=True)
    entity_id: int | None = Field(default=None, foreign_key="entity.id")
    tag_id: int | None = Field(default=None, foreign_key="tag.id")
