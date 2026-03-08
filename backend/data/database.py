from sqlmodel import create_engine, SQLModel

engine = create_engine("sqlite:///data/data.db")

SQLModel.metadata.create_all(engine)