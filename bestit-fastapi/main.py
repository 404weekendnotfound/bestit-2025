import requests
from fastapi import FastAPI, UploadFile, File, HTTPException
import os
import shutil
import uuid
import pymupdf4llm

app = FastAPI()


@app.post("/upload-cv/")
async def upload_cv(file: UploadFile = File(...)):
    # Sprawdzenie typu pliku
    allowed_content_types = [
        "application/pdf"  # ,
        # "image/jpeg", "image/png", "image/jpg"
    ]

    if file.content_type not in allowed_content_types:
        raise HTTPException(status_code=400, detail="Available file types: PDF, JPG, JPEG, PNG")

    # Generowanie unikalnej nazwy pliku
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"

    # Utworzenie folderu na pliki CV, jeśli nie istnieje
    os.makedirs("media/cv_uploads", exist_ok=True)

    # Zapisywanie pliku
    file_location = f"media/cv_uploads/{unique_filename}"
    with open(file_location, "wb") as buffer:
        # noinspection PyTypeChecker
        shutil.copyfileobj(file.file, buffer)

    try:
        markdown_content = pymupdf4llm.to_markdown(file_location)

        req_post = requests.post("https://n8n.weekendnotfound.pl/webhook/cv-analyze/",
                                 json={
                                     "filename": unique_filename,
                                     "content": markdown_content
                                 })

        # Zapisz wygenerowany markdown do pliku
        markdown_file = f"media/cv_uploads/{unique_filename}.md"
        with open(markdown_file, "w", encoding="utf-8") as md_file:
            md_file.write(markdown_content)

    except Exception as e:
        return {
            "original_filename": file.filename,
            "saved_as": unique_filename,
            "content_type": file.content_type,
            "status": "CV has been uploaded successfully, but conversion to markdown failed",
            "error": str(e)
        }

    return {
        "original_filename": file.filename,
        "saved_as": unique_filename,
        "content_type": file.content_type,
        "status": "CV has been uploaded and converted to markdown successfully",
        "markdown_file": markdown_file,
        "markdown_preview": markdown_content[:200] + "..." if len(markdown_content) > 200 else markdown_content,
        "req_post": req_post
    }

@app.get("/")
async def test():
    return {
        "Test": "test"
    }