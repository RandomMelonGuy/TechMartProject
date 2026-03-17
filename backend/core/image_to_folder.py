from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path
import shutil

router = APIRouter()
ALLOWED_EXTENSIONS = {"image/jpeg", "image/png", "image/webp"}


@router.post("/upload")
async def image_to_folder(image_file: UploadFile = File(...)):
    if image_file.content_type not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Можно загружать только изображения (jpg, png, webp)")

    target_folder = Path("static")
    target_folder.mkdir(exist_ok=True)

    file_path = target_folder / image_file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image_file.file, buffer)

    return {"info": f"Файл '{image_file.filename}' успешно сохранен в папку static"}