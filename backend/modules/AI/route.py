import os
import shutil
import uuid
from fastapi import APIRouter, UploadFile, File
from core.types import APIResponce
from .service import AIService

router = APIRouter()
ai_service = AIService(auth_token="ТВОЙ_КЛЮЧ_GIGACHAT")


@router.post("/process-document")
async def process_document(file: UploadFile = File(...)):
    upload_dir = "uploads/temp"
    os.makedirs(upload_dir, exist_ok=True)

    file_ext = os.path.splitext(file.filename)[1]
    temp_name = f"{uuid.uuid4()}{file_ext}"

    file_path = os.path.join(upload_dir, temp_name)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        analysis_result = ai_service.analyze_diploma(file_path)

        analysis_result["filepath"] = file_path

        return APIResponce(status="success", data=analysis_result)


    except Exception as e:
        return APIResponce(status="error", data=f"AI Error: {repr(e)}")